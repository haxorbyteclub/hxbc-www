using System.Net.Http.Json;
namespace HaxorByteClub;

public class WallpaperService
{
	HttpClient _httpClient;
	List<Wallpaper> _wallpapers;
	public WallpaperService(HttpClient http)
	{
		_httpClient = http;
		_wallpapers = new List<Wallpaper>();
	}
	public async Task<List<Wallpaper>> GetWallpapers()
	{
		if (_wallpapers.Count == 0)
		{
			_wallpapers = await _httpClient.GetFromJsonAsync<List<Wallpaper>>(Constants.WallpapersEndpoint);
		}
		return _wallpapers;
	}
}
