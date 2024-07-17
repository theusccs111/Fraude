using Fraude.Web.Resource.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Fraude.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileImageController : ControllerBase
    {
        private readonly string imagesDireitaFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/ImagesDireita");
        private readonly string imagesEsquerdaFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/ImagesEsquerda");

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImages([FromForm] List<IFormFile> files, [FromForm] string lado)
        {
            if (files == null || files.Count == 0)
            {
                return BadRequest("No files uploaded.");
            }

            try
            {
                var uploadedFilePaths = new List<string>();
                string folder = lado.Equals("direita") ? imagesDireitaFolderPath : imagesEsquerdaFolderPath;

                foreach (var file in files)
                {
                    var filePath = Path.Combine(folder, file.FileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    uploadedFilePaths.Add(filePath);
                }

                return Ok(new { FilePaths = uploadedFilePaths });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("download")]
        public IActionResult GetAllImages([FromBody] ImageRequest request)
        {
            try
            {
                string folder = request.Lado.Equals("direita") ? imagesDireitaFolderPath : imagesEsquerdaFolderPath;
                var filePaths = Directory.GetFiles(folder);

                var imageUrls = filePaths.Select(filePath =>
                {
                    var fileName = Path.GetFileName(filePath);
                    var fileUrl = $"/download/{fileName}/{request.Lado}";
                    return new { FileName = fileName, FileUrl = fileUrl };
                }).ToList();

                return Ok(imageUrls);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("download/{fileName}/{lado}")]
        public IActionResult DownloadImage(string fileName, string lado)
        {
            string folder = lado.Equals("direita") ? imagesDireitaFolderPath : imagesEsquerdaFolderPath;
            var filePath = Path.Combine(folder, fileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found.");
            }

            try
            {
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                return File(fileBytes, "image/jpg"); // Altere o MIME type conforme o tipo da imagem
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
