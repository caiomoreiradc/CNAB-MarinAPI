using System.ComponentModel.DataAnnotations;

namespace CNAB_MarinAPI.Models
{
    public class Transacao
    {
        public int Id { get; set; }
        public int LojaId { get; set; }
        public Loja Loja { get; set; }
        public char Tipo { get; set; }
        public DateTime DataHoraMovimentacao { get; set; }
        public decimal Valor { get; set; }
        [StringLength(11)]
        public string CPF { get; set; }
        [StringLength(16)]
        public string Cartao { get; set; }
        [StringLength(10)]
        public string Natureza { get; set; } 
        public char Sinal { get; set; } 
    }
}
