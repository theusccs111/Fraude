using Fraude.Web.Resource.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;

namespace Fraude.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IpController : ControllerBase
    {
        private readonly IpsAdministradoresSettings _options;
        public IpController(IOptions<IpsAdministradoresSettings> options)
        {
            _options = options.Value;
        }

        private List<string> Ips
        {
            get
            {
                return _options.Ip.Split(";").ToList();
            }
        }
        [HttpGet]
        public IActionResult GetIp()
        {
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
            bool podeAcessar = Ips.Contains(ipAddress);

            return Ok(new { ip = ipAddress , podeAcessar = podeAcessar });
        }
    }
}
