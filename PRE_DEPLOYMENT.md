# Pre-Deployment Checklist

## Security
- [ ] Replace JWT `Key` in `appsettings.json` with a strong, random secret and move it to an environment variable
- [ ] Create an official app email (e.g. noreply@tally.com) to replace the personal Gmail
- [ ] Move `Email:Password` (Gmail App Password) to an environment variable — remove it from `appsettings.json`
- [ ] Move `Email:From` to an environment variable or update it to the official email
- [ ] Move database `ConnectionStrings:DefaultConnection` credentials to an environment variable
