using CNAB_MarinAPI.Models;
using CNAB_MarinAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CNAB_MarinAPI.Controllers
{
    [Route("api/transacoes")]
    [ApiController]
    public class TransacoesController : ControllerBase
    {
        private readonly TransacaoService _transacaoService;

        public TransacoesController(TransacaoService transacaoService)
        {
            _transacaoService = transacaoService;
        }

        [HttpGet]
        public  ActionResult<IEnumerable<Transacao>> GetAllTransactions()
        {
            var transactions =  _transacaoService.GetAllTransacoes();
            return Ok(transactions);
        }

    }
}
