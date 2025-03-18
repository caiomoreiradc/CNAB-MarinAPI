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

        public async Task<List<Transacao>> GetAllTransacoes()
        {
            var transactions = await _context.Transacoes.ToListAsync();
            return transactions;
        }

    }
}
