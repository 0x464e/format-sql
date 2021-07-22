# SQL Formatter

An AutoHokey/NodeJS script to automatically format SQL code upon a hotkey press.  
The JavaScript side of this is also doable just fine in AHK, but I was just into testing out new stuff in js when I made this, so yeah.  
I will probably push a future commit at one point to just remove the whole NodeJS side of this.

This works by making a web request to [dpdriver's online SQL formatter](https://www.dpriver.com/pp/sqlformat.htm). I was looking for an SQL formatter to use, and out of everything I found, I really liked theirs best. So I had to make something to use is to format my SQL on the fly.  
Downside is of course latency/privacy. It'll take a bit to get a response from their server, but I'm fine this.

![image](https://i.imgur.com/rd2AaMR.gif)

## Installing
> **AutoHotkey is Windows only!**
* Install [AutoHotkey](https://www.autohotkey.com/) 
* Install [NodeJS](https://nodejs.org/en/)
* Clone this repository  
`git clone https://github.com/0x464e/format-sql`
* Install the required Node packages from `package.json` by running `npm install`

## Configuration
### Hotkey restriction
I have set the used hotkey to only work when SQL Server Management Studio is the active window, because that's where I'm writing my SQL.  
To change this, you'll want to change this part in the AHK code:  
```ahk
#IfWinActive, ahk_exe Ssms.exe
...
#IfWinActive
```
I'm matching a window that's running from `Ssms.exe` process.  
If you want to match a different window, consult the AHK documentation [here](https://www.autohotkey.com/docs/misc/WinTitle.htm) and make the necessary changes, or remove this part altogether so the hotkey works anywhere.

### Hotkey configuration
I have set the hotkey to `Ctrl+p` <sub><sup>(who needs a print hotkey?)</sup></sub> with `^p`.  
To change this, consult the AHK documentation page [here](https://www.autohotkey.com/docs/Hotkeys.htm) for how the hotkey syntax works in AHK.

### Formatting options
Dpdriver's online SQL formatter is configurable with a number of different options, you can test the options in their site [here](https://www.dpriver.com/pp/sqlformat.htm) and then change the options however you see fit in the `index.js` file.  
The options are visible in the XML request.

### System tray icon
Uncomment [line 2](https://github.com/0x464e/format-sql/blob/master/FormatSQL.ahk#L2) in `FormatSQL.ahk` to not have an AHK tray icon when the script is running.

## Usage
Launch the AHK script by just double clicking your `.ahk` file.  
<sup><sub>(If the AHK installation would've somehow failed to associate `.ahk` files with the AHK interpreter, you can manually run `.ahk` files by just passing in the file to the interpreter, which is found in your AHK installation directory (usually `C:\Program Files\AutoHotkey\AutoHotkey.exe`))</sub></sup>  
Highlight your desired SQL code and press your Hotkey.  
The formatted SQL will automatically be pasted on top of your old SQL.