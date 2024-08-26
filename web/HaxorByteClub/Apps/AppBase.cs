using CommunityToolkit.Mvvm.Messaging;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace HaxorByteClub.Apps;

//base component
public class AppBase : ComponentBase
{
	[Inject]
	public IJSRuntime _js { get; set; }
	public string AppId { get; set; }

	public AppBase()
	{
		//initialize
	}

	protected void Remove()
	{
		WeakReferenceMessenger.Default.Send(new RemoveAppMessage(AppId));

	}

	protected override async Task OnAfterRenderAsync(bool firstRender)
	{
		if(firstRender)
		{
			await _js.InvokeVoidAsync("setupDragElement", AppId);
		}
	}
}
