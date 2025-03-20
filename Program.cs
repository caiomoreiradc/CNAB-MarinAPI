using CNAB_MarinAPI;
using CNAB_MarinAPI.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Adicionanndo o Contexto
builder.Services.AddControllers()
    .AddNewtonsoftJson();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddSwaggerGen();

//Registrando Serviço
builder.Services.AddScoped<CnabService>();
builder.Services.AddScoped<TransacaoService>();
builder.Services.AddScoped<LojaService>();

// Habilitando CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseCors("AllowAll"); // Adicionando CORS aqui!

app.UseSwagger(); // Ativa o Swagger
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "CNAB API MARIN LOG");
    c.RoutePrefix = "";
});

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllers();

app.Run();
