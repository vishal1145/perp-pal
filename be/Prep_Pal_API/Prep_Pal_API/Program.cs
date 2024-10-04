using Prep_Pal_API.Configuration;
using Prep_Pal_API.Middleware;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Configure MongoDbConfiguration from appsettings.json
builder.Services.Configure<MongoDbConfiguration>(builder.Configuration.GetSection("MongoDbConfiguration"));

// Register other services
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseMiddleware<RequestLoggingMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
