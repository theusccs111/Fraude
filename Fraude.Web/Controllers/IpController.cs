using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fraude.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IpController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetIp()
        {
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
            return Ok(new { ip = ipAddress });
        }
    }
}
