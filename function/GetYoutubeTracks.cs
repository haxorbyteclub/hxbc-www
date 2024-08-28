using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YoutubeExplode;
using YoutubeExplode.Common;
using YoutubeExplode.Videos.Streams;

namespace HaxorByteClub.Functions;

public class GetYoutubeTracks
{
    private readonly ILogger<GetYoutubeTracks> _logger;
    List<Track> result = new();

    public GetYoutubeTracks(ILogger<GetYoutubeTracks> logger)
    {
        _logger = logger;
    }

    [Function("GetYoutubeTracks")]
    public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
    {
        try
        {
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            var tracks = await GetTracks();
            foreach (var track in tracks)
            {
                _logger.LogInformation(track.ToString());
            }
            return new OkObjectResult(tracks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred");
            return new BadRequestObjectResult("An error occurred: " + ex);
        }
    }


    async Task<List<Track>> GetTracks()
    {
        try
        {


            var youtube = new YoutubeClient();
            var playlistUrl = "https://www.youtube.com/playlist?list=PLEelxuGt2Io5jGNnA44S9lRhclhz7po1U";

            // Get all playlist videos
            var videos = await youtube.Playlists.GetVideosAsync(playlistUrl);

            var videosSubset = await youtube.Playlists.GetVideosAsync(playlistUrl).CollectAsync(201);
            //randomize the order of the videos
            videosSubset = videosSubset.OrderBy(_ => Guid.NewGuid()).ToList().ToList();
            var options = new ParallelOptions
            {
                MaxDegreeOfParallelism = 4
            };
            //iterate parallelly through the videos and get the audio stream
            await Parallel.ForEachAsync(videosSubset, options, async (video, token) =>
            {
                //get audio stream
                try
                {
                    var streamInfoSet = await youtube.Videos.Streams.GetManifestAsync(video.Id);
                    var audioStreamInfo = streamInfoSet.GetAudioStreams().GetWithHighestBitrate();
                    if (audioStreamInfo is not null)
                    {
                        var duration = video.Duration?.TotalSeconds ?? 0;
                        result.Add(new Track(video.Id, video.Title, video.Author.ChannelTitle, (int)duration, audioStreamInfo.Url));
                    };
                    _logger.LogInformation($"Added {video.Title}");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"An error occurred while processing video {video.Id}");
                }
            });


            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred");
            return result;
        }
    }
}

public record Track(string Id, string Name, string Artist, int Duration, string Url)
{
    public override string ToString() => $"{Id} - {Name} - {Artist} ({Duration}s) - {Url}";
}
