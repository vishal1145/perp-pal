namespace Prep_Pal_API.Models
{
    public class PaginatedResponse<T>
    {

        public int TotalRecords { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; } // Optionally add this field
        public IEnumerable<T> Records { get; set; }
    }
}
