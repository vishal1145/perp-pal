using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Prep_Pal_API.Models
{
    /// <summary>
    /// Represents a question in a quiz or exam.
    /// </summary>
    public class QuestionModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string QuestionId { get; set; }

        [Required(ErrorMessage = "Question text is required.")]
        [StringLength(500, ErrorMessage = "Question text cannot exceed 500 characters.")]
        public string Question { get; set; }

        [Required(ErrorMessage = "Options are required.")]
        public List<OptionModel> Options { get; set; } // Changed to list of OptionModel

        [Required(ErrorMessage = "Correct answer text is required.")]
        [StringLength(500, ErrorMessage = "Correct answer text cannot exceed 500 characters.")]
        public string CorrectAnswer { get; set; }
    }

    /// <summary>
    /// Represents an individual option in a question.
    /// </summary>
    public class OptionModel
    {
        [Required(ErrorMessage = "Option text is required.")]
        [StringLength(500, ErrorMessage = "Option text cannot exceed 500 characters.")]
        public string OptionText { get; set; }

        // Add the new OptionFlag property
        [Required(ErrorMessage = "Option flag is required.")]
        public string OptionFlag { get; set; } // Will hold A, B, C, D
    }

}
