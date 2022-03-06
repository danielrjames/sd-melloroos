using System.ComponentModel.DataAnnotations;

namespace api.Domain.Entities.MelloRoos
{
    public class Tax
    {
        [Key]
        public int Id { get; set; }
        public double LandValue { get; set; }
        public double ImprovementValue { get; set; }
        public double NetValue { get; set; }

        public double BaseTax { get; set; }
        public double Rate { get; set; }
        public double FixedCharges { get; set; }
        public double TotalTax { get; set; }

        public int PropertyId { get; set; }
        public Property Property { get; set; } = null!;
    }
}
