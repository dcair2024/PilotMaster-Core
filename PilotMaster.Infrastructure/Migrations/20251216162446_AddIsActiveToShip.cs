using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PilotMaster.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIsActiveToShip : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Ships",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Ships");
        }
    }
}
