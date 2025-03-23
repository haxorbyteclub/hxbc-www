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


