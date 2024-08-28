using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace HaxorByteClub.Apps;

//base component
public abstract class AppBase : ComponentBase
{

	[Inject]
	protected IJSRuntime _js { get; set; }


	[Parameter]
	public string AppId { get; set; }

	protected virtual void Remove()
	{
		WeakReferenceMessenger.Default.Send(new RemoveAppMessage(AppId));

	}

	protected override void OnInitialized()
	{
		base.OnInitialized();
	}

	protected override async Task OnAfterRenderAsync(bool firstRender)
	{
		if (firstRender)
		{
			await _js.InvokeVoidAsync("setupDragElement", AppId);
		}
	}
}
