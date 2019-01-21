using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DevilBlog.Data.Core.Services;
using DevilBlog.Models.Abstract;
using DevilBlog.Models.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DevilBlog.Data
{
    public class DevilBlogDbContext : IdentityDbContext<AspNetUser, AspNetRole, string>
    {
        private readonly UserResolverService _userService;

        public string CurrentUserId { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<PostTopic> PostTopics { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<PostTag> PostTags { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DbSet<Country> Countries { get; set; }
        public DbSet<Resource> Resources { get; set; }

        public DevilBlogDbContext(DbContextOptions options, UserResolverService userService)
            : base(options)
        {
            _userService = userService;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Server=DEVIL;Database=DevilBlogDB;Trusted_Connection=True;User Id=sa;Password=admin@123; MultipleActiveResultSets=true;");
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //AspNetUsers
            builder.Entity<AspNetUser>().HasMany(u => u.Claims).WithOne().HasForeignKey(c => c.UserId).IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<AspNetUser>().HasMany(u => u.Roles).WithOne().HasForeignKey(r => r.UserId).IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            //AspNetRoles
            builder.Entity<AspNetRole>().ToTable("AspNetRoles");
            builder.Entity<AspNetRole>().HasMany(r => r.Claims).WithOne().HasForeignKey(c => c.RoleId).IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<AspNetRole>().HasMany(r => r.Users).WithOne().HasForeignKey(r => r.RoleId).IsRequired()
                .OnDelete(DeleteBehavior.Cascade);




            builder.Entity<Post>().ToTable("Posts");

            builder.Entity<Post>().HasIndex(p => p.Slug).IsUnique();
            builder.Entity<Post>().HasMany(p => p.Comments).WithOne(c => c.Post).IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Topic>().ToTable("Topics");
            builder.Entity<Topic>().HasIndex(t => t.Title).IsUnique();

            builder.Entity<PostTopic>().HasKey(pt => new { pt.PostId, pt.TopicId });

            builder.Entity<PostTopic>().HasOne(pt => pt.Post).WithMany(p => p.PostTopics)
                .HasForeignKey(pt => pt.PostId);

            builder.Entity<PostTopic>().HasOne(pt => pt.Topic).WithMany(t => t.PostTopics)
                .HasForeignKey(pt => pt.TopicId);

            builder.Entity<PostTag>().HasKey(pt => new { pt.PostId, pt.TagId });
            builder.Entity<PostTag>().HasOne(pt => pt.Post).WithMany(p => p.PostTags).HasForeignKey(pt => pt.PostId);

            builder.Entity<PostTag>().HasOne(pt => pt.Tag).WithMany(t => t.PostTags).HasForeignKey(pt => pt.TagId);

            builder.Entity<Comment>().ToTable("Comments");
            //builder.Entity<Comment>()
            //.HasMany(c => c.ChildComments)
            //.WithOne(c => c.Parent)
            //.HasForeignKey(c => c.ParentId)
            //.IsRequired(false)
            //.OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Category>().ToTable("Categories");

            builder.Entity<Country>().HasMany(c => c.Resources).WithOne(r => r.Country).IsRequired();
        }

        public override int SaveChanges()
        {
            UpdateAuditEntities();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            UpdateAuditEntities();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            UpdateAuditEntities();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void UpdateAuditEntities()
        {
            DateTime now = DateTime.UtcNow;
            // Get the authenticated user name 
            string userName = _userService.GetUser();

            var modifiedEntries = ChangeTracker.Entries().Where(x =>
                x.Entity is IAuditableEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));
            foreach (var entry in modifiedEntries)
            {
                var entity = (IAuditableEntity)entry.Entity;


                if (entry.State == EntityState.Added)
                {
                    entity.CreatedDate = now;
                    entity.CreatedBy = userName;
                }
                else
                {
                    base.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                    base.Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                }

                entity.UpdatedDate = now;
                entity.UpdatedBy = userName;
            }
        }
    }
}