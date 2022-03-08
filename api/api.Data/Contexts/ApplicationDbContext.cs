using api.Domain.Entities.Auth;
using api.Domain.Entities.MelloRoos;
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

        public DbSet<AuthClient> AuthClients => Set<AuthClient>();
        public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

        public DbSet<Assessment> Assessments => Set<Assessment>();
        public DbSet<Fund> Funds => Set<Fund>();
        public DbSet<Property> Properties => Set<Property>();
        public DbSet<Tax> Taxes => Set<Tax>();
        public DbSet<SearchTerm> SearchTerms => Set<SearchTerm>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            builder.Entity<AuthClient>().ToTable("AuthClient");
            builder.Entity<RefreshToken>().ToTable("RefreshToken");

            builder.Entity<Assessment>().ToTable("Assessment");
            builder.Entity<Fund>().ToTable("Fund");
            builder.Entity<Property>().ToTable("Property");
            builder.Entity<Tax>().ToTable("Tax");
            builder.Entity<SearchTerm>().ToTable("SearchTerm");

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

            // Mello Roos
            builder.Entity<Property>()
                .HasOne(a => a.Tax)
                .WithOne(b => b.Property)
                .IsRequired(true)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Property>()
                .HasOne(a => a.Assessment)
                .WithOne(b => b.Property)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Assessment>()
                .HasMany(a => a.Funds)
                .WithOne(b => b.Assessment)
                .IsRequired(true)
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
