namespace api.Domain.Entities.MelloRoos
{
    public class SearchTerm
    {
        public long Id { get; set; }
        public string Address { get; set; } = string.Empty;

        public int PropertyId { get; set; }
        public Property Property { get; set; } = null!;
    }
}
