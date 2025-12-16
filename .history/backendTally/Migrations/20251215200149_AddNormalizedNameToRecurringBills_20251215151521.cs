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
            
            migrationBuilder.CreateIndex(
                name: "IX_RecurringBills_UserId_NormalizedName",
                table: "RecurringBills",
                columns: new[] { "UserId", "NormalizedName" },
                unique: true
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RecurringBills_UserId_NormalizedName",
                table: "RecurringBills"
            );

            migrationBuilder.DropColumn(
                name: "NormalizedName",
                table: "RecurringBills"
            );
        }
            
    }
}
