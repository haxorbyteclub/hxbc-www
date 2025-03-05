using System.Net.Http.Json;
using System.Text.Json;
using YoutubeExplode;

namespace HaxorByteClub;

public class TrackService
{
	HttpClient _httpClient;
	List<Track> tracks;
	public TrackService(HttpClient http)
	{
		_httpClient = http;
		tracks = new List<Track>();
	}
	public async Task<List<Track>> GetTracks()
	{
		if (tracks.Count == 0)
		{
			tracks = await _httpClient.GetFromJsonAsync<List<Track>>("music/data.json");
		}
		return tracks;
	}
}
