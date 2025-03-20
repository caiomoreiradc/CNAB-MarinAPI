using CNAB_MarinAPI.DTOs;
using CNAB_MarinAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CNAB_MarinAPI.Controllers
{
    [Route("api/lojas/")]
    [ApiController]
    public class LojasController : ControllerBase
    {
        private readonly LojaService _lojaService;

        public LojasController(LojaService lojaService)
        {
            _lojaService = lojaService;
        }

        [HttpGet("saldos")]
        public ActionResult<List<LojaSaldoDTO>> ObterLojasComSaldo()
        {
            var lojas = _lojaService.ObterLojasComSaldo();
            return Ok(lojas);
        }
    }
}
