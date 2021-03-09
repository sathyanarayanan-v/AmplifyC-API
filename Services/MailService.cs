using System;
using API.Interfaces;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;

namespace API.Services
{
    public class MailService : IMailService
    {



        public void sendMail(string toName, string toEmail, string subject, string body)
        {
            string username = Environment.GetEnvironmentVariable("EMAIL_USERNAME");
            string password = Environment.GetEnvironmentVariable("EMAIL_PASSWORD");
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("AmplifyC", username));
            message.To.Add(new MailboxAddress(toName, toEmail));
            message.Subject = subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = body;
            message.Body = builder.ToMessageBody();


            using (var client = new SmtpClient())
            {

                client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                client.Connect("smtp.gmail.com", 587);
                client.Authenticate(username, password);
                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}