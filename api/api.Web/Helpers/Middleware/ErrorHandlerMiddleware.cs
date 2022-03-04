using api.Web.Helpers.Exceptions;
using System.Net;
using System.Text.Json;

namespace api.Web.Helpers.Middleware
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly bool _prodEnv;

        public ErrorHandlerMiddleware(RequestDelegate next, bool prodEnv)
        {
            _next = next;
            _prodEnv = prodEnv;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                var response = context.Response;
                response.ContentType = "application/json";

                switch (error)
                {
                    // custom http response error
                    case HttpResponseException ex:
                        response.StatusCode = ex.StatusCode == 200 ? (int)HttpStatusCode.OK : (int)HttpStatusCode.BadRequest;
                        break;

                    // not found error
                    case KeyNotFoundException ex:    
                        response.StatusCode = (int)HttpStatusCode.NotFound;
                        break;

                    // unhandled error
                    default:   
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                }

                if (!_prodEnv)
                {
                    var result = JsonSerializer.Serialize(new { message = error?.Message });

                    await response.WriteAsync(result);
                }
            }
        }
    }
}
