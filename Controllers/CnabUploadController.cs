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


            // Processa o arquivo e retorna o número de linhas processadas
            int linhasProcessadas = _cnabService.ProcessarArquivo(filePath);

            return Ok(new { processedCount = linhasProcessadas });
        }
    }
}
