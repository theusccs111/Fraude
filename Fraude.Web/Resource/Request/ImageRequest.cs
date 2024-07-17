using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Fraude.Web.Resource.Request
{
    public class ImageRequest
    {
        public string Lado { get; set; }
        public List<IFormFile> Files { get; set; }
        
    }
}
