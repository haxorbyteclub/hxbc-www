using CommunityToolkit.Mvvm.Messaging.Messages;
namespace HaxorByteClub;

public class RemoveAppMessage : RequestMessage<string>
{
	public string AppId { get; set; }
	public RemoveAppMessage(string appId)
	{
		AppId = appId;
	}
}

public class AddAppMessage : RequestMessage<AppType>
{
	public AppType Type { get; set; }
	public string Metadata { get; set; }
	public AddAppMessage(AppType type, string metadata)
	{
		Type = type;
		Metadata = metadata;
	}
}





