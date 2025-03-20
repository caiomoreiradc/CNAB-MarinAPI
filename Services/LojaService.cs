using CNAB_MarinAPI.DTOs;

namespace CNAB_MarinAPI.Services
{
    public class LojaService
    {
        private readonly AppDbContext _context;

        public LojaService(AppDbContext context)
        {
            _context = context;
        }

        public List<LojaSaldoDTO> ObterLojasComSaldo()
        {
            return _context.Lojas
                .Select(loja => new LojaSaldoDTO
                {
                    NomeLoja = loja.Nome,
                    Dono = loja.Dono,
                    Saldo = loja.Saldo
                })
                .ToList();
        }
    }
}
