using Microsoft.AspNetCore.Mvc;
using System;
using System.Text;
using System.Threading.Tasks;

namespace TechExam.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextController : ControllerBase
    {
        [HttpPost("encode")]
        public async Task<IActionResult> EncodeTextAsync([FromBody] TextData textData)
        {
            if (textData == null)
            {
                return BadRequest("Input text is missing.");
            }

            string inputText = textData.Text;

            byte[] bytes = Encoding.UTF8.GetBytes(inputText);
            string encodedText = Convert.ToBase64String(bytes);

            var responseText = "";

            foreach (var character in encodedText)
            {
                responseText += character;
                await Task.Delay(new Random().Next(1000, 5000)); 
            }

            return Ok(new { encodedText = responseText });
        }

        public class TextData
        {
            public string Text { get; set; }
        }
    }
}
