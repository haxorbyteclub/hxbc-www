using CommunityToolkit.Mvvm.Messaging.Messages;
namespace HaxorByteClub.Models;

public class Message
{
	public string Text { get; set; }
	public string User { get; set; }
	public DateTime Date { get; set; }
}


public class ShowEditorMessage : ValueChangedMessage<EditorLaunchSettings>
{
	public ShowEditorMessage(EditorLaunchSettings value) : base(value)
	{
	}
}

public class EditorLaunchSettings
{
	public string? Text { get; set; }
	public string? Title { get; set; }

	public EditorLaunchSettings(string? text, string? title)
	{
		Text = text;
		Title = title;
	}
}