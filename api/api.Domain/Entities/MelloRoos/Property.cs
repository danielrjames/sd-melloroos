using System.ComponentModel.DataAnnotations;

namespace api.Domain.Entities.MelloRoos
{
    public class Property
    {
        [Key]
        public int Id { get; set; }
        public string Address { get; set; } = string.Empty;
        public string Parcel { get; set; } = string.Empty;
        public string Owner { get; set; } = string.Empty;
        public DateTime RecordDate { get; set; }

        public Assessment? Assessment { get; set; }
        public Tax Tax { get; set; } = new Tax();

        public ICollection<SearchTerm> SearchTerms { get; set; } = new List<SearchTerm>();

    }
}
