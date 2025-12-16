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
              // Add computed column using raw SQL
    migrationBuilder.Sql(@"
        ALTER TABLE RecurringBills 
        ADD NormalizedName AS LOWER(LTRIM(RTRIM(Name))) PERSISTED
    ");

    // Create unique index on (UserId, NormalizedName)
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
            migrationBuilder.DropColumn(
                name: "NormalizedName",
                table: "RecurringBills");
        }
    }
}
