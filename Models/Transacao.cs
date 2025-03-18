namespace CNAB_MarinAPI.Models
{
    public class Transacao
    {
        public int Id { get; set; }
        public int LojaId { get; set; }
        public Loja Loja { get; set; }
        public char Tipo { get; set; }
        public DateOnly DataMovimentacao { get; set; }
        public decimal Valor { get; set; }
        public string CPF { get; set; }
        public string Cartao { get; set; }
        public TimeOnly HoraMovimentacao { get; set; }
        public string Natureza { get; set; } //Será Mapeado depois
        public char Sinal { get; set; } //Será Mapeado depois
    }
}
