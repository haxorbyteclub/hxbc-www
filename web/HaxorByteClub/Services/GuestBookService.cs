
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using HaxorByteClub.Models;

namespace HaxorByteClub.Services;

public class GuestBookService
{
	private readonly ObservableCollection<Message> _messages = new ObservableCollection<Message>();

	public event NotifyCollectionChangedEventHandler MessagesChanged
	{
		add { _messages.CollectionChanged += value; }
		remove { _messages.CollectionChanged -= value; }
	}

	public void AddMessage(Message message)
	{
		if (message.Date == DateTime.MinValue)
		{
			message.Date = DateTime.Now;
		}
		_messages.Add(message);
	}

	public IEnumerable<Message> GetMessages()
	{
		return _messages;
	}

	public GuestBookService()
	{
		//5 demo messages
		_messages.Add(new Message { Text = "Hello World!", User = "Alice", Date = DateTime.Now });
		_messages.Add(new Message { Text = "Hi!", User = "Bob", Date = DateTime.Now });
		_messages.Add(new Message
		{
			Text = "Hey!",
			User = "Charlie",
		});
		_messages.Add(new Message
		{
			Text = "Hi there!",
			User = "David",
			Date = DateTime.Now
		});

		//with more text
		_messages.Add(new Message
		{
			Text = "Hello World! This is a longer message to test the layout of the guest book. It should wrap around and look good on the page. Let's see how it goes!",
			User = "Eve",
			Date = DateTime.Now
		});

		//another one
		_messages.Add(new Message
		{
			Text = "Hello World!",
			User = "Alice",
			Date = DateTime.Now
		});

	}
}
