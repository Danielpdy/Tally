using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

public class EmailService
{
    private readonly IConfiguration _config;
    public EmailService(IConfiguration config)
    {
        _config = config;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Tally", _config["Email:From"]));
        message.To.Add(new MailboxAddress("", toEmail));
        message.Subject = subject;
        message.Body = new TextPart("html") {Text = body};

        using var client = new SmtpClient();
        await client.ConnectAsync(
            _config["Email:SmtpHost"],
            int.Parse(_config["Email:SmtpPort"]),
            SecureSocketOptions.StartTls
        );
        await client.AuthenticateAsync(
            _config["Email:From"],
            _config["Email:Password"]
        );
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}