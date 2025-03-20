using CNAB_MarinAPI.Models;
using CNAB_MarinAPI.DTOs;
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

        public int ProcessarArquivo(string caminhoArquivo)
        {
            var linhas = File.ReadAllLines(caminhoArquivo);
            var qtdLinhas = linhas.Length;

            //dicionário para armazenar lojas já carregadas na memória
            var lojasCache = _context.Lojas.ToDictionary(l => (l.Nome, l.Dono));

            foreach (var linha in linhas)
            {
                var tipo = linha[0];
                var (natureza, sinal) = TipoTransacao.ContainsKey(tipo) ? TipoTransacao[tipo] : ("Desconhecido", '?');

                var lojaNome = linha.Substring(62).Trim();
                var dono = linha.Substring(48, 14).Trim();

                // verificar dicionario primeiro
                if (!lojasCache.TryGetValue((lojaNome, dono), out var loja))
                {
                    loja = new Loja { Nome = lojaNome, Dono = dono, Saldo = 0 };
                    _context.Lojas.Add(loja);
                    lojasCache.Add((lojaNome, dono), loja); // add no dic
                }

                // processa a transação e atualiza o saldo da loja
                var valor = decimal.Parse(linha.Substring(9, 10)) / 100;
                loja.Saldo += (sinal == '-') ? -valor : valor;

                var transacao = new Transacao
                {
                    Loja = loja,
                    Tipo = tipo,
                    DataMovimentacao = DateOnly.ParseExact(linha.Substring(1, 8), "yyyyMMdd", CultureInfo.InvariantCulture),
                    Valor = valor,
                    CPF = linha.Substring(19, 11),
                    Cartao = linha.Substring(30, 12),
                    HoraMovimentacao = TimeOnly.ParseExact(linha.Substring(42, 6), "HHmmss", CultureInfo.InvariantCulture),
                    Natureza = natureza,
                    Sinal = sinal
                };

                _context.Transacoes.Add(transacao);
            }

            _context.SaveChanges();
            return qtdLinhas;
        }

        // calcular o saldo de uma loja
        public LojaSaldoDTO ObterSaldoLoja(string nomeLoja)
        {
            var loja = _context.Lojas.FirstOrDefault(l => l.Nome == nomeLoja);
            if (loja == null)
            {
                return null;
            }

            var saldo = _context.Transacoes
                .Where(t => t.Loja.Nome == nomeLoja)
                .Sum(t => t.Valor);

            return new LojaSaldoDTO
            {
                NomeLoja = loja.Nome,
                Dono = loja.Dono,
                Saldo = saldo
            };
        }
    }
}
