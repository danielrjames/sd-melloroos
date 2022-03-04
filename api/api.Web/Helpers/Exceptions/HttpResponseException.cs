using System.Globalization;

namespace api.Web.Helpers.Exceptions
{
    public class HttpResponseException : Exception
    {

        public int StatusCode { get; set; } = 400;

        public HttpResponseException() : base() { }

        public HttpResponseException(string message) : base(message) { }

        public HttpResponseException(string message, int statusCode) : base(message)
        {
            StatusCode = statusCode;
        }
    }
}
