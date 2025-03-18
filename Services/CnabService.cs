using CNAB_MarinAPI.Models;
using System.Globalization;

namespace CNAB_MarinAPI.Services
{
    public class CnabService
    {
        private readonly AppDbContext _context;

        public CnabService(AppDbContext context)
        {
            _context = context;
        }

        private static readonly Dictionary<char, (string Natureza, char Sinal)> TipoTransacao = new()
        {
            { '1', ("Entrada", '+') },
            { '2', ("Saída", '-') },
            { '3', ("Saída", '-') },
            { '4', ("Entrada", '+') },
            { '5', ("Entrada", '+') },
            { '6', ("Entrada", '+') },
            { '7', ("Entrada", '+') },
            { '8', ("Entrada", '+') },
            { '9', ("Saída", '-') }
        };

        public void ProcessarArquivo(string caminhoArquivo)
        {
            var linhas = File.ReadAllLines(caminhoArquivo);

            foreach (var linha in linhas)
            {
                var tipo = linha[0];
                var (natureza, sinal) = TipoTransacao.ContainsKey(tipo) ? TipoTransacao[tipo] : ("Desconhecido", '?');

                var lojaNome = linha.Substring(62).Trim();
                var dono = linha.Substring(48, 14).Trim();

                var loja = _context.Lojas.FirstOrDefault(l => l.Nome == lojaNome) ??
                           new Loja { Nome = lojaNome, Dono = dono };

                var transacao = new Transacao
                {
                    Loja = loja,
                    Tipo = tipo,
                    DataMovimentacao = DateOnly.ParseExact(linha.Substring(1, 8), "yyyyMMdd", CultureInfo.InvariantCulture), // Índices 2-9 (data)
                    Valor = decimal.Parse(linha.Substring(9, 10)) / 100, // Índices 10-19 (valor)
                    CPF = linha.Substring(19, 11), // Índices 20-30 (CPF)
                    Cartao = linha.Substring(30, 12), // Índices 31-42 (cartão)
                    HoraMovimentacao = TimeOnly.ParseExact(linha.Substring(42, 6), "HHmmss", CultureInfo.InvariantCulture), // Índices 43-48 (hora)
                    Natureza = natureza,
                    Sinal = sinal
                };

                _context.Transacoes.Add(transacao);
            }

            _context.SaveChanges();
        }


    }
}
