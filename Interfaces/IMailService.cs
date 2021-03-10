namespace API.Interfaces
{
    public interface IMailService
    {
        void sendMail(string toName, string toEmail, string subject, string body);
    }
}