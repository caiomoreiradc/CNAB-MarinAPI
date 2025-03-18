using CNAB_MarinAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CNAB_MarinAPI
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Loja> Lojas { get; set; }
        public DbSet<Transacao> Transacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Transacao>()
                .HasOne(t => t.Loja)
                .WithMany(l => l.Transacoes)
                .HasForeignKey(t => t.LojaId);
        }
    }
}
