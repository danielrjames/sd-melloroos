namespace api.Domain.Entities.Auth
{
    public class TokenConfig
    {
        public string Key { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public int JwtExpiration { get; set; }
        public int RefreshExpiration { get; set; }
        public int RememberMeExpiration { get; set; }
    }
}
