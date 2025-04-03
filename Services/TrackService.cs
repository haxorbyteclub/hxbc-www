using System.Net.Http.Json;

namespace HaxorByteClub;

public class TrackService
{
	HttpClient _httpClient;
	List<Track> _tracks;
	public TrackService(HttpClient http)
	{
		_httpClient = http;
		_tracks = new List<Track>();
	}
	public async Task<List<Track>> GetTracks()
	{
		if (_tracks.Count == 0)
		{
			_tracks = await _httpClient.GetFromJsonAsync<List<Track>>(Constants.BaseUrl + Constants.TracksEndpoint);
		}
		return _tracks;
	}
}
