using CNAB_MarinAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CNAB_MarinAPI.Controllers
{
    [Route("api/cnab/upload")]
    [ApiController]
    public class CnabUploadController : ControllerBase
    {
        private readonly CnabService _cnabService;

        public CnabUploadController(CnabService cnabService)
        {
            _cnabService = cnabService;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Nenhum arquivo enviado.");

            var filePath = Path.GetTempFileName();
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            _cnabService.ProcessarArquivo(filePath);
            return Ok("Arquivo processado com sucesso!");
        }
    }
}
