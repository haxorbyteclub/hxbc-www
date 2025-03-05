using HaxorByteClub;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddSingleton(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddSingleton<YoutubeService>();
builder.Services.AddSingleton<GuestBookService>();
builder.Services.AddSingleton<TrackService>();
builder.Services.AddSingleton<WallpaperService>();

await builder.Build().RunAsync();
