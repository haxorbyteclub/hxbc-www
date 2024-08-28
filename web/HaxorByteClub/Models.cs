namespace HaxorByteClub;

public record Track(string Id, string Name, string Artist, int Duration, string Url)
{
	//split name and return captialized lowercase name
	public string GetName() => Name.Split(" - ")[0].ToLower().FirstCharToUpper();
	public override string ToString() => $"{Id} - {Name} - {Artist} ({Duration}s) - {Url}";
}
