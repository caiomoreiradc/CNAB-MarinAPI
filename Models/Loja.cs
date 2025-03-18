namespace CNAB_MarinAPI.Models
{
    public class Loja
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Dono { get; set; }
        public List<Transacao> Transacoes { get; set; } = new();
    }
}
