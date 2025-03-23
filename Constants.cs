namespace HaxorByteClub;

public static class Constants
{

#if DEBUG
	public const string BaseUrl = "http://localhost:5062";
#else
	public const string BaseUrl = "https://haxorbyteclub.runasp.net";
#endif

	public const string HNEndpoint = "/api/v0/hackernews";
	public const string GuestbookEndpoint = "/api/v0/guestbook";
	public const string TracksEndpoint = "/api/v0/music";
}

