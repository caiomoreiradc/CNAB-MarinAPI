using CNAB_MarinAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CNAB_MarinAPI.Services
{
    public class TransacaoService
    {
        private readonly AppDbContext _context;

        public TransacaoService(AppDbContext context)
        {
            _context = context;
        }

        public List<Transacao> GetAllTransacoes()
        {
            var transactions =  _context.Transacoes.ToList();

            foreach(Transacao transacao in transactions)
            {
                var lojas = _context.Lojas.FirstOrDefault(x => x.Id == transacao.LojaId);
                lojas.Transacoes = null;
                transacao.Loja = lojas; 
            }

            return transactions;
        }

    }
}
