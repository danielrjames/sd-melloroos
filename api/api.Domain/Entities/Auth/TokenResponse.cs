namespace api.Domain.Entities.Auth
{
    public class TokenResponse
    {
        public string AccessToken { get; set; } = string.Empty;
        public string TokenType { get; set; } = string.Empty;
        public int Expiration { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
    }
}
