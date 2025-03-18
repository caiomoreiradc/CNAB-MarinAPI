﻿// <auto-generated />
using System;
using CNAB_MarinAPI;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CNAB_MarinAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CNAB_MarinAPI.Models.Loja", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Dono")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Lojas");
                });

            modelBuilder.Entity("CNAB_MarinAPI.Models.Transacao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CPF")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Cartao")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("DataMovimentacao")
                        .HasColumnType("date");

                    b.Property<TimeOnly>("HoraMovimentacao")
                        .HasColumnType("time");

                    b.Property<int>("LojaId")
                        .HasColumnType("int");

                    b.Property<string>("Natureza")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Sinal")
                        .IsRequired()
                        .HasColumnType("nvarchar(1)");

                    b.Property<string>("Tipo")
                        .IsRequired()
                        .HasColumnType("nvarchar(1)");

                    b.Property<decimal>("Valor")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("LojaId");

                    b.ToTable("Transacoes");
                });

            modelBuilder.Entity("CNAB_MarinAPI.Models.Transacao", b =>
                {
                    b.HasOne("CNAB_MarinAPI.Models.Loja", "Loja")
                        .WithMany("Transacoes")
                        .HasForeignKey("LojaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Loja");
                });

            modelBuilder.Entity("CNAB_MarinAPI.Models.Loja", b =>
                {
                    b.Navigation("Transacoes");
                });
#pragma warning restore 612, 618
        }
    }
}
