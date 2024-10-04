using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Prep_Pal_API.Configuration;
using Prep_Pal_API.Data;
using Prep_Pal_API.Models;
using MongoDB.Driver.Linq;

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

        // Response model for pagination
        public class PaginatedResponse<T>
        {
            public int TotalRecords { get; set; }
            public int CurrentPage { get; set; }
            public int PageSize { get; set; }
            public int TotalPages { get; set; } // Optionally add this field
            public IEnumerable<T> Records { get; set; }
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

        // POST: api/Prompt
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(PromptsModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] PromptsModel prompts)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //PromptData PromptDatas = new PromptData();
            //foreach (var x in PromptDatas.PromptText)
            //{
            //    prompts.prompt_text = x;


            //}
            prompts.Id = ObjectId.GenerateNewId().ToString(); // Generate a new ID
            prompts.no_of_used = 0; // Set to 0 when created
            prompts.createdAt = DateTime.UtcNow; // Set to current time

            await _context.PromptsModels.InsertOneAsync(prompts);
            // Initialize default values for new prompts

            // Return the created resource in the response body
            return CreatedAtAction(nameof(Get), new { id = prompts.Id }, prompts);
        }
    }
}
