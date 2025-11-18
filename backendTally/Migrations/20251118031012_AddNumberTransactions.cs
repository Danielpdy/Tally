using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backendTally.Migrations
{
    /// <inheritdoc />
    public partial class AddNumberTransactions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberTransactions",
                table: "Transactions",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberTransactions",
                table: "Transactions");
        }
    }
}
