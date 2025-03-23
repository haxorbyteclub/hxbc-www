namespace HaxorByteClub;

public record Track(string Id, string Name, string Artist, string Duration, string Genre, string Url)
{
	public string[] Genres => Genre.Split('_').Select(g => g.Replace('-', ' ')).ToArray();

	public int DurationInSeconds => int.Parse(Duration.Split(':')[0]) * 60 + int.Parse(Duration.Split(':')[1]);
}


public record Wallpaper(string Id, string Name, string Url);
