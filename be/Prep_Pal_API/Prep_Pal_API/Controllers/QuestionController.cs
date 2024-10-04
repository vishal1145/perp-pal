using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using OfficeOpenXml;
using Prep_Pal_API.Data;
using Prep_Pal_API.Models;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;

namespace Prep_Pal_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly MongoDbContext _context;

        // Constructor to inject MongoDbContext
        public QuestionController(MongoDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadExcelFile(IFormFile file)
        {
            // Set the license context for EPPlus
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            // Check if a file was uploaded
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            // Ensure the file is an Excel file
            if (!file.FileName.EndsWith(".xlsx"))
                return BadRequest("Invalid file format. Only .xlsx files are supported.");

            try
            {
                // Load the Excel file
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    using (var package = new ExcelPackage(stream))
                    {
                        // Check if there are any worksheets
                        if (package.Workbook.Worksheets.Count == 0)
                            return BadRequest("The uploaded file has no worksheets.");

                        ExcelWorksheet worksheet = package.Workbook.Worksheets.First(); // Get the first worksheet
                        var rowCount = worksheet.Dimension?.Rows ?? 0; // Use null-coalescing to avoid null reference
                        var colCount = worksheet.Dimension?.Columns ?? 0; // Use null-coalescing to avoid null reference

                        // Initialize a list to hold QuestionModels
                        var questionModels = new List<QuestionModel>();

                        for (int row = 2; row <= rowCount; row++) // Start from 2 to skip header
                        {
                            if (worksheet.Cells[row, 1].Text == string.Empty) // Skip empty rows
                                continue;

                            // Create the question model
                            var questionModel = new QuestionModel()
                            {
                                QuestionId = ObjectId.GenerateNewId().ToString(), // Generate a new ID
                                Question = worksheet.Cells[row, 1].Text,
                                Options = new List<OptionModel>
                        {
                            new OptionModel { OptionText = worksheet.Cells[row, 2].Text, OptionFlag = "A" },
                            new OptionModel { OptionText = worksheet.Cells[row, 3].Text, OptionFlag = "B" },
                            new OptionModel { OptionText = worksheet.Cells[row, 4].Text, OptionFlag = "C" },
                            new OptionModel { OptionText = worksheet.Cells[row, 5].Text, OptionFlag = "D" }
                        },
                                CorrectAnswer = worksheet.Cells[row, 6].Text
                            };

                            questionModels.Add(questionModel);
                        }

                        // Insert all models at once
                        if (questionModels.Any())
                        {
                            await _context.QuestionModels.InsertManyAsync(questionModels);
                        }

                        // Return the number of records inserted
                        return Ok(new { Count = questionModels.Count });
                    }
                }
            }
            catch (IOException ioEx)
            {
                // Handle file-related exceptions specifically
                return StatusCode(500, $"File error: {ioEx.Message}");
            }
            catch (Exception ex)
            {
                // Handle general exceptions
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        // GET api/paper
        [HttpGet]
        public async Task<IActionResult> GetAllQuestions()
        {
            try
            {
                // Retrieve all questions from the database
                var questions = await _context.QuestionModels.Find(_ => true).ToListAsync();

                if (questions == null || !questions.Any())
                    return NotFound("No questions found.");

                // Shape the data to return only necessary fields or add any custom formatting
                var result = questions.Select(q => new
                {
                    QuestionId = q.QuestionId,
                    Question = q.Question,
                    Options = q.Options.Select(o => new
                    {
                        OptionText = o.OptionText,
                        OptionFlag = o.OptionFlag
                    }).ToList(),
                    CorrectAnswer = q.CorrectAnswer
                });

                // Return the list of questions with shaped response
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Handle general exceptions
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
