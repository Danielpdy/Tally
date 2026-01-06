namespace backendTally.Utils
{
    public static class WeekCalculator
    {
        public static DateTime GetCurrentWeekStart()
        {
            var today = DateTime.UtcNow.Date;
            int daysFromMonday = ((int)today.DayOfWeek - (int)DayOfWeek.Monday + 7) % 7;
            return today.AddDays(-daysFromMonday);
        }

        public static DateTime GetCurrentWeekEnd()
        {
            return GetCurrentWeekStart().AddDays(7).AddTicks(-1);
        }

        public static int CalculateDaysLeft()
        {
            var today = DateTime.UtcNow.Date;
            var endOfWeek = GetCurrentWeekEnd();
            return Math.Max(0, (endOfWeek - today).Days);
        }
    }
}