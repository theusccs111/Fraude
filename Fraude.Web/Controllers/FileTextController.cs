using Fraude.Web.Resource.Request;
using Fraude.Web.Resource.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Fraude.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileTextController : ControllerBase
    {
        private readonly string filePath1 = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/Text/msg1.txt");
        private readonly string filePath2 = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/Text/msg2.txt");

        [HttpPost("save")]
        public async Task<IActionResult> SaveToFile([FromBody] TextFileRequest request)
        {
            try
            {
                await System.IO.File.WriteAllTextAsync(filePath1, request.Param1);
                await System.IO.File.WriteAllTextAsync(filePath2, request.Param2);

                return Ok("File saved successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("read")]
        public IActionResult ReadFile()
        {
            if (!System.IO.File.Exists(filePath1) && !System.IO.File.Exists(filePath2))
            {
                return NotFound("Algum arquivo txt não existe.");
            }

            try
            {
                var content1 = System.IO.File.ReadAllText(filePath1);
                var content2 = System.IO.File.ReadAllText(filePath2);
                TextFileResponse response = new TextFileResponse();
                response.Param1 = content1;
                response.Param2 = content2;

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
