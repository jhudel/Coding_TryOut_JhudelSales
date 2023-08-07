using System.Threading.Tasks;

namespace TechExam.Services
{
    public interface ITextEncoder
    {
        Task<string> EncodeAsync(string text);
    }
}
