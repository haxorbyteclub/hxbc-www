
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Net.Http.Headers;
using System.Text.Encodings.Web;
using HaxorByteClub.Models;

namespace HaxorByteClub.Services;

public class GuestBookService
{
	private ObservableCollection<Message> _messages = new ObservableCollection<Message>();

	public event NotifyCollectionChangedEventHandler MessagesChanged
	{
		add { _messages.CollectionChanged += value; }
		remove { _messages.CollectionChanged -= value; }
	}

	public async Task AddMessage(Message message)
	{
		_messages.Add(message);
		var json = JsonSerializer.Serialize(message, new JsonSerializerOptions
		{
			PropertyNameCaseInsensitive = true,
			Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
			Converters =
			{
				new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)
			}
		});
		var content = new StringContent(json, Encoding.UTF8, "application/json");
		await _httpClient.PostAsync(Constants.BaseUrl + Constants.GuestbookEndpoint, content);
	}

	public async Task<List<Message>> GetMessages(bool forceRefresh = false)
	{
		if (_messages.Count == 0 || forceRefresh)
		{
			var guestbook = await GetGuestbook();
			_messages.Clear();
			_messages = new ObservableCollection<Message>(guestbook);
		}
		return _messages.ToList();
	}

	private async Task<List<Message>> GetGuestbook()
	{
		var guestbookString = await _httpClient.GetStringAsync(Constants.BaseUrl + Constants.GuestbookEndpoint);
		var guestbook = JsonSerializer.Deserialize<List<Message>>(guestbookString, new JsonSerializerOptions
		{
			PropertyNameCaseInsensitive = true,
			Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
			Converters =
			{
				new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)
			}
		});

		return guestbook;
	}

	public GuestBookService(HttpClient client)
	{
		_httpClient = client;
	}
	private readonly HttpClient _httpClient;
}
