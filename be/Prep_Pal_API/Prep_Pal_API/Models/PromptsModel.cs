using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Prep_Pal_API.Models
{
    public class PromptsModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } // No need to bind this from the request

        [Required(ErrorMessage = "Prompt text is required.")]
        [StringLength(500, ErrorMessage = "Prompt text cannot exceed 500 characters.")]
        public string prompt_text { get; set; }

        [Required(ErrorMessage = "Prompt Description text is required.")]
        [StringLength(500, ErrorMessage = "Prompt Description text cannot exceed 500 characters.")]
        public string prompt_Description { get; set; }

        [Required]
        public bool isActive { get; set; } = true; // Default to active when created

        [JsonIgnore] // Prevent this property from being serialized/deserialized
        [Range(0, int.MaxValue, ErrorMessage = "Number of uses must be non-negative.")]
        public int no_of_used { get; set; } // Default will be set in controller

        [JsonIgnore] // Prevent this property from being serialized/deserialized
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime createdAt { get; set; } // Default will be set in controller
    }
}
