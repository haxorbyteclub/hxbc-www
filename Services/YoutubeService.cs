using System.Net.Http.Json;
using System.Text.Json;
using YoutubeExplode;

namespace HaxorByteClub;

public class YoutubeService
{
	HttpClient _httpClient;
	public YoutubeService(HttpClient http)
	{
		_httpClient = http;
	}
	public async Task<List<Track>> GetTracks()
	{
		var result = await _httpClient.GetFromJsonAsync<List<Track>>("data/tracks.json");
		return result ?? new List<Track>();
	}
}
