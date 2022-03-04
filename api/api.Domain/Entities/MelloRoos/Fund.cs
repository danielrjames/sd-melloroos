using System.ComponentModel.DataAnnotations;

namespace api.Domain.Entities.MelloRoos
{
    public class Fund
    {
        [Key]
        public int Id { get; set; }
        public int Order { get; set; }
        public string Description { get; set; } = string.Empty;
        public int FundNumber { get; set; }
        public double Amount { get; set; }

        public int AssessmentId { get; set; }
        public Assessment? Assessment { get; set; }
    }
}
