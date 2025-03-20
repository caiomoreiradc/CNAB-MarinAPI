using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CNAB_MarinAPI.Migrations
{
    /// <inheritdoc />
    public partial class EditadoPadraoDataHora : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataMovimentacao",
                table: "Transacoes");

            migrationBuilder.DropColumn(
                name: "HoraMovimentacao",
                table: "Transacoes");

            migrationBuilder.AddColumn<DateTime>(
                name: "DataHoraMovimentacao",
                table: "Transacoes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataHoraMovimentacao",
                table: "Transacoes");

            migrationBuilder.AddColumn<DateOnly>(
                name: "DataMovimentacao",
                table: "Transacoes",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<TimeOnly>(
                name: "HoraMovimentacao",
                table: "Transacoes",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));
        }
    }
}
