using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml;
using System;
using System.IO;
using Newtonsoft.Json;
using Fraude.Web.Resource.Request;

namespace Fraude.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly string colorFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/Json/color.json");

        [HttpGet]
        public IActionResult GetColor()
        {
            if (!System.IO.File.Exists(colorFilePath))
            {
                return NotFound("Color file not found.");
            }

            var colorData = System.IO.File.ReadAllText(colorFilePath);
            return Ok(colorData);
        }

        [HttpPost]
        public IActionResult SetColor([FromBody] ColorRequest request)
        {
            var allowedColors = new[] { "blue", "red", "yellow", "green" };

            if (!Array.Exists(allowedColors, c => c.Equals(request.Color, StringComparison.OrdinalIgnoreCase)))
            {
                return BadRequest("Invalid color. Allowed colors are: blue, red, yellow, green.");
            }

            var colorData = new { color = request.Color };
            var json = JsonConvert.SerializeObject(colorData, Newtonsoft.Json.Formatting.Indented);

            System.IO.File.WriteAllText(colorFilePath, json);

            return Ok($"Color updated to {request.Color}.");
        }
    }
}
