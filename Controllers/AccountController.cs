using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMailService _mailService;
        public AccountController(DataContext context, ITokenService tokenService, IMailService mailService)
        {
            _mailService = mailService;
            _tokenService = tokenService;
            _context = context;

        }


        [HttpPost("register")]
        public async Task<ActionResult<LoginResponseDto>> Register(AccountRegisterDto registerDto)
        {
            using var hmac = new HMACSHA512();

            if (await UserExists(registerDto.username, registerDto.email)) return BadRequest("Oops. Username is taken");

            var user = new AppUser
            {
                UserName = registerDto.username.ToLower(),
                Email = registerDto.email.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
                PasswordSalt = hmac.Key,

            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _tokenService.signToken(user);
            return new LoginResponseDto
            {
                username = user.UserName,
                token = token
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(user => user.UserName == loginDto.username);
            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            var token = _tokenService.signToken(user);
            return new LoginResponseDto
            {
                username = user.UserName,
                token = token
            };

        }


        private async Task<bool> UserExists(string username, string email)
        {
            return await _context.Users.AnyAsync(user => user.UserName.ToLower() == username.ToLower() && (user.Email.ToLower() == email.ToLower()));
        }

        private async Task<AppUser> FindUserByEmail(string email)
        {
            return await _context.Users.SingleOrDefaultAsync<AppUser>(user => user.Email == email.ToLower());
        }

        [Authorize]
        [HttpPost("forgot-password/send-mail")]
        public async Task<ActionResult<string>> forgotPassword([FromQuery] FPCodeGenDto fPCodeGenDto)
        {


            AppUser user = await FindUserByEmail(fPCodeGenDto.email);
            if (user == null)
            {
                return BadRequest("Email address not found");
            }
            Random generator = new Random();
            String forgotPasswordCode = generator.Next(0, 1000000).ToString("D6");

            user.FpCode = forgotPasswordCode;
            user.FpCodeExpiry = DateTimeOffset.Now.AddMinutes(15).ToUnixTimeSeconds();

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            String emailBody = "Your verification code for AmplifyC is <b>" + forgotPasswordCode + "</b>. <br/><br/> This code will expire in 15 minutes.<br/><br/> This is an automatic generated email. Do not reply to this email.";
            _mailService.sendMail(user.UserName, fPCodeGenDto.email, "Forgot Password mail from AmplifyC", emailBody);
            return "Email sent to " + fPCodeGenDto.email + ". Kindly check your inbox.";

        }

    }
}