# Terminal Component Commands Documentation

## Overview
The Terminal component is an interactive command-line interface built for the HaxorByte Club web application. It simulates a Unix-like terminal environment with various commands and easter eggs for user engagement.

## Basic Commands

### File System Commands
- **`ls`** - List directory contents
  - `ls -la` or `ls -al` - List with detailed information including permissions, dates, and hidden files
  - Example output: Shows virtual files and folders like Documents/, Downloads/, readme.txt, etc.

- **`pwd`** - Print working directory
  - Returns: `/home/user`

- **`cat <filename>`** - Display file contents
  - Supported files:
    - `readme.txt` - Welcome message and exploration hint
    - `secrets.dat` - Binary representation of "Haxor"
    - `config.json` - Mock configuration file with hacker theme settings
  - Unknown files return "No such file or directory" error

- **`mkdir <dirname>`** - Create directory (virtual)
  - Creates directories virtually (no actual file system interaction)

- **`cd <directory>`** - Change directory (cosmetic)
  - Always responds that directory changed but user stays in same location

### System Information Commands
- **`whoami`** - Display current user
  - Returns: `user`

- **`date`** - Show current date and time
  - Format: `ddd MMM dd HH:mm:ss UTC yyyy`

- **`uptime`** - System uptime information
  - Returns random uptime between 1-30 days and 1-24 hours

- **`ps`** - Show running processes
  - Displays mock process list with PID, TTY, TIME, and CMD columns

- **`top`** - Display running processes with resource usage
  - Shows mock process information with CPU and memory usage

- **`version`** - Display terminal version
  - Returns: "HaxorByte Terminal v1.0 - Built with Blazor"

### Utility Commands
- **`help`** - Display help message with all available commands

- **`clear`** - Clear terminal screen and show welcome message

- **`echo <text>`** - Display the provided text
  - Example: `echo Hello World` outputs "Hello World"

- **`history`** - Show command history
  - Displays numbered list of all previously executed commands

- **`exit`** / **`quit`** - Display goodbye message

## Network Commands
- **`ping`** - Test network connectivity
  - Returns mock ping response to google.com

- **`netstat`** - Show network connections
  - Displays mock active internet connections on ports 80 and 443

- **`ifconfig`** - Display network interface information
  - Shows mock ethernet interface with IP address 192.168.1.100

- **`nmap`** - Network mapper simulation
  - Returns mock Nmap scan results

## Administrative Commands
- **`sudo <command>`** - Execute command with elevated privileges
  - Prompts for password and shows mock execution message
  - Always responds that user doesn't have actual sudo access

- **`rm <file>`** - Remove files (safety mode)
  - Always responds: "rm: cannot remove files (safety mode enabled)"

- **`chmod <permissions> <file>`** - Change file permissions
  - Always responds: "chmod: permissions changed (not really)"

## Fun Commands

### ASCII Art Commands
- **`cowsay <message>`** - ASCII cow saying the provided message
  - If no message provided, cow says "Moo!"
  - Creates speech bubble with cow ASCII art

- **`coffee`** - Display ASCII coffee art
  - Shows coffee cup art with "Coffee break time!" message

- **`sl`** - Steam locomotive ASCII art
  - Displays detailed ASCII art of a steam train

### Entertainment Commands
- **`fortune`** - Display random programming wisdom
  - Rotating collection of programming quotes and wisdom

- **`joke`** - Tell a random programming joke
  - Collection of programmer humor and puns

- **`weather`** - Show weather information
  - Generates random weather conditions for "HaxorByte City"
  - Includes temperature, condition, humidity, and wind speed

### Special Effect Commands
- **`matrix`** - Display Matrix-style binary effect
  - Shows binary sequences with "Wake up, Neo..." message

- **`hack`** - Hacking simulation
  - Animated progress bars for various "hacking" activities
  - Includes disclaimer that no actual hacking occurred

- **`lolcat`** - Colorful text effect
  - Returns: "🌈 Everything is colorful! 🌈"

## Easter Eggs

### Pop Culture References
- **`42`** - The Answer to the Ultimate Question of Life, the Universe, and Everything
  - Reference to "The Hitchhiker's Guide to the Galaxy"

- **`xyzzy`** - Classic adventure game magic word
  - Returns: "Nothing happens."

- **`plugh`** - Another adventure game reference
  - Returns: "A hollow voice says 'Plugh'."

### Gaming References
- **`konami`** - Konami Code reference
  - Returns: "↑↑↓↓←→←→BA - Cheat code activated! (Not really)"

### Hidden Commands
- **`secret`** - Secret discovery command
  - Returns: "🎉 You found a secret command! Here's a cookie: 🍪"

- **`hello`** - Friendly greeting
  - Returns welcoming message with wave emoji

### Application-Specific
- **`about`** - Information about HaxorByte Club
  - Returns: "HaxorByte Club - Where hackers meet! 🚀"

## Features

### Command History
- Use ↑ (Up Arrow) and ↓ (Down Arrow) to navigate through command history
- Commands are automatically saved to history (duplicates are filtered)
- `history` command displays numbered list of all previous commands

### Auto-Scroll
- Terminal automatically scrolls to bottom when new output is added
- Ensures latest commands and output are always visible

### Focus Management
- Input field maintains focus for seamless typing experience
- Focus is restored after command execution

### Responsive Design
- Terminal window is resizable (600x400px default)
- Scrollable output area with custom dark theme scrollbar
- Monospace font (Courier New) for authentic terminal appearance

### Visual Theme
- Dark terminal theme with green prompt text (#00ff00)
- Black background (#0c0c0c) with light text
- Realistic terminal prompt: `user@haxorbyte:~$`

## Technical Implementation

### Component Structure
- Built as Blazor component inheriting from `AppBase`
- Uses `@bind` for two-way data binding on input
- Manages command history and output lines in component state

### Event Handling
- `@onkeypress` for capturing Enter, Up Arrow, and Down Arrow keys
- Async command execution with state updates
- JavaScript interop for focus management and scrolling

### Safety Features
- Commands that could be destructive (like `rm`) are safely mocked
- No actual file system or network operations are performed
- All outputs are simulated for entertainment and education

## Usage Tips
1. Type `help` to see all available commands
2. Try the easter egg commands for fun surprises
3. Use tab completion isn't implemented, but command history navigation works
4. All file operations are virtual - no real files are affected
5. Experiment with different command combinations and arguments

## Contributing
To add new commands:
1. Add the command case to the `ProcessCommand` method switch statement
2. Create a handler method for complex commands
3. Update this documentation with the new command details
4. Consider adding easter eggs and fun responses to maintain the playful nature

The terminal is designed to be educational, entertaining, and safe while providing an authentic command-line experience for users of the HaxorByte Club application.
