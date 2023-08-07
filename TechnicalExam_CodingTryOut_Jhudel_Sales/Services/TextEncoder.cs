using System;
using System.Threading.Tasks;

namespace TechExam.Services
{
    public class TextEncoder : ITextEncoder
    {
        private static readonly Random Random = new Random();

        public async Task<string> EncodeAsync(string text)
        {
            string encodedText = string.Empty;

            foreach (char character in text)
            {
                encodedText += character;
                int randomPause = Random.Next(1000, 5000); 
                await Task.Delay(randomPause);
            }

            return encodedText;
        }
    }
}
