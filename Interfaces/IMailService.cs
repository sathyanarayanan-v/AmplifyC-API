namespace API.Interfaces
{
    public interface IMailService
    {
        void sendMail(string from, string to, string subject, string body);
    }
}