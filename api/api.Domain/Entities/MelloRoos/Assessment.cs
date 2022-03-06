using System.ComponentModel.DataAnnotations;

namespace api.Domain.Entities.MelloRoos
{
    public class Assessment
    {
        [Key]
        public int Id { get; set; }
        public double Total { get; set; }

        public ICollection<Fund> Funds { get; set; } = new List<Fund>();

        public int PropertyId { get; set; }
        public Property Property { get; set; } = null!;
    }
}
