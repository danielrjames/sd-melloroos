using api.Domain.Entities.Auth;
using api.Domain.Entities.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace api.Data.Contexts
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<AuthClient> AuthClients { get; set; } = null!;
        public DbSet<RefreshToken> RefreshTokens { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            builder.Entity<AuthClient>().ToTable("AuthClient");
            builder.Entity<RefreshToken>().ToTable("RefreshToken");

            // User
            builder.Entity<ApplicationUser>()
                .Property(a => a.ClusterId)
                .ValueGeneratedOnAdd()
                .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

            builder.Entity<ApplicationUser>()
                .HasIndex(c => c.ClusterId)
                .IsUnique(true);

            builder.Entity<ApplicationUser>()
                .HasMany(a => a.RefreshTokens)
                .WithOne(b => b.User)
                .OnDelete(DeleteBehavior.Cascade);

            // Seed data
            builder.Entity<AuthClient>().HasData(
                new AuthClient()
                {
                    Id = 1,
                    Name = "nuxt-client",
                    Active = true
                }
            );
        }
    }
}
