using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backendTally.Migrations
{
    /// <inheritdoc />
    public partial class AddNormalizedNameToRecurringBills : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NormalizedName",
                table: "RecurringBills");
        }
    }
}
