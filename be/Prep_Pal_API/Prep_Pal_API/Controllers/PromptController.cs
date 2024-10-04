using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Prep_Pal_API.Configuration;
using Prep_Pal_API.Data;
using Prep_Pal_API.Models;
using MongoDB.Driver.Linq;
using OfficeOpenXml;

namespace Prep_Pal_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromptController : ControllerBase
    {

        private readonly MongoDbContext _context;
        private static List<PromptsModel> _articles = GenerateSampleArticles();

        private static List<PromptsModel> GenerateSampleArticles()

        {

            // Generate and return sample articles

            return new List<PromptsModel>

            {

                // Add more sample articles

            };

        }
        public PromptController(IOptions<MongoDbConfiguration> settings)
        {
            _context = new MongoDbContext(settings);
        }

        // GET: api/Prompt
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<PromptsModel>>> Get()
        //{
        //    var prompts = await _context.PromptsModels.Find(_ => true).ToListAsync();

        //    return Ok(prompts);
        //}

        [HttpGet]
        public async Task<ActionResult<PaginatedResponse<PromptsModel>>> Get([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string filter = "")
        {
            // Input validation
            if (page < 1)
            {
                return BadRequest("Page number must be greater than or equal to 1.");
            }

            if (pageSize < 1 || pageSize > 100) // Optional limit on page size
            {
                return BadRequest("Page size must be between 1 and 100.");
            }

            // Start with the queryable collection
            var query = _context.PromptsModels.AsQueryable();

            // Apply filter based on the prompt_text property
            if (!string.IsNullOrEmpty(filter))
            {
                // Check if prompt_text contains the filter string
                query = query.Where(prompt => prompt.prompt_text != null && prompt.prompt_text.Contains(filter));
            }

            // Count total records and calculate total pages
            var totalCount = await query.CountAsync(); // Count filtered records
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            // Apply pagination
            var prompts = await query
                .Skip((page - 1) * pageSize) // Skip the records for previous pages
                .Take(pageSize) // Take records for the current page
                .ToListAsync();

            // Create response model
            return Ok(new PaginatedResponse<PromptsModel>
            {
                TotalRecords = totalCount,
                CurrentPage = page,
                PageSize = pageSize,
                TotalPages = totalPages, // Optionally include total pages
                Records = prompts
            });
        }



        // GET: api/Prompt/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PromptsModel>> Get(string id)
        {
            var prompt = await _context.PromptsModels.Find(a => a.Id == id).FirstOrDefaultAsync();

            if (prompt == null)
            {
                return NotFound();
            }

            // Increment the usage count each time the prompt is retrieved
            prompt.no_of_used += 1;

            // Update the prompt in the database to reflect the increment
            var updateDefinition = Builders<PromptsModel>.Update.Set(p => p.no_of_used, prompt.no_of_used);
            await _context.PromptsModels.UpdateOneAsync(p => p.Id == id, updateDefinition);

            return Ok(prompt);
        }



        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(List<PromptsModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post(IFormFile excelFile)
        {
            if (excelFile == null || excelFile.Length == 0)
            {
                return BadRequest("No file uploaded or file is empty.");
            }

            List<PromptsModel> promptsList = new List<PromptsModel>();

            using (var stream = new MemoryStream())
            {
                await excelFile.CopyToAsync(stream);

                try
                {
                    // Set the LicenseContext
                    ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

                    using (var package = new ExcelPackage(stream))
                    {
                        // Ensure the file contains at least one worksheet
                        if (package.Workbook.Worksheets.Count == 0)
                        {
                            return BadRequest("The Excel file contains no worksheets.");
                        }

                        ExcelWorksheet worksheet = package.Workbook.Worksheets.First();
                        var rowCount = worksheet.Dimension?.Rows ?? 0;
                        var colCount = worksheet.Dimension?.Columns ?? 0;

                        if (rowCount == 0 || colCount == 0)
                        {
                            return BadRequest("The worksheet is empty.");
                        }

                        for (int row = 2; row <= rowCount; row++) // Assuming row 1 is the header
                        {
                            PromptsModel prompts = new PromptsModel
                            {
                                Id = ObjectId.GenerateNewId().ToString(),
                                no_of_used = 0,
                                createdAt = DateTime.UtcNow,
                                prompt_text = worksheet.Cells[row, 2].Value?.ToString().Trim(),
                                prompt_Description = worksheet.Cells[row, 3].Value?.ToString().Trim(),
                            };

                            if (!string.IsNullOrEmpty(prompts.prompt_text) && !string.IsNullOrEmpty(prompts.prompt_Description))
                            {
                                promptsList.Add(prompts);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest($"Error processing the file: {ex.Message}");
                }
            }

            if (promptsList.Count > 0)
            {
                await _context.PromptsModels.InsertManyAsync(promptsList);
                return CreatedAtAction(nameof(Get), new { id = promptsList.First().Id }, promptsList);
            }

            return BadRequest("No valid data found in the Excel file.");
        }
    }
}
