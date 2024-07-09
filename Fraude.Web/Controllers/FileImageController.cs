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
        private readonly string imagesFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/Images");

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImages(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
            {
                return BadRequest("No files uploaded.");
            }

            try
            {
                var uploadedFilePaths = new List<string>();

                foreach (var file in files)
                {
                    var filePath = Path.Combine(imagesFolderPath, file.FileName);

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

        [HttpGet("download")]
        public IActionResult GetAllImages()
        {
            try
            {
                var filePaths = Directory.GetFiles(imagesFolderPath);

                var imageUrls = filePaths.Select(filePath =>
                {
                    var fileName = Path.GetFileName(filePath);
                    var fileUrl = $"/api/image/download/{fileName}";
                    return new { FileName = fileName, FileUrl = fileUrl };
                }).ToList();

                return Ok(imageUrls);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("download/{fileName}")]
        public IActionResult DownloadImage(string fileName)
        {
            var filePath = Path.Combine(imagesFolderPath, fileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found.");
            }

            try
            {
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                return File(fileBytes, "image/jpeg"); // Altere o MIME type conforme o tipo da imagem
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
