using System.ComponentModel.DataAnnotations;

namespace api.Domain.Entities.MelloRoos
{
    public class Property
    {
        [Key]
        public int Id { get; set; }
        public string Address { get; set; } = string.Empty;
        public int LookupDate { get; set; }
        public int Parcel { get; set; }
        public string Owner { get; set; } = string.Empty;

        public Assessment? Assessment { get; set; }
        public Tax? Tax { get; set; }

    }
}
