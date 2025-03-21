using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CNAB_MarinAPI.Models
{
    public class Loja
    {
        public int Id { get; set; }
        [StringLength(40)]
        public string Nome { get; set; }

        [StringLength(32)]
        public string Dono { get; set; }
        public decimal Saldo { get; set; }

        public List<Transacao> Transacoes { get; set; } = new();
    }
}
