namespace HaxorByteClub;

public static class Extensions
{
	public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> source)
	{
		var sourceArray = source.ToArray();
		for (int i = 0; i < sourceArray.Length - 1; i++)
		{
			int j = Random.Shared.Next(i, sourceArray.Length);
			yield return sourceArray[j];
			sourceArray[j] = sourceArray[i];
		}
		yield return sourceArray[^1];
	}

	public static string FirstCharToUpper(this string input) =>
	input switch
	{
		null => throw new ArgumentNullException(nameof(input)),
		"" => throw new ArgumentException($"{nameof(input)} cannot be empty", nameof(input)),
		_ => string.Concat(input[0].ToString().ToUpper(), input.AsSpan(1))
	};
}
