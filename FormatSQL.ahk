#SingleInstance, Force
;#NoTrayIcon ;uncomment me for no tray icon

#IfWinActive, ahk_exe Ssms.exe
^p::
	OgClipboard := ClipboardAll
	ActiveWindow := WinActive("A")
	Clipboard := ""
	SendInput, ^c
	ClipWait, 1
	if (ErrorLevel || StrLen(Clipboard) < 5)
	{
		DisplayToolTip("Error:`nNothing copied")
		Return
	}
	
	arg := Clipboard
	shell := ComObjCreate("WScript.Shell")
	shell.Run("node " A_ScriptDir "\index.js """ arg """", 0, true)
	if (WinActive("A") == ActiveWindow)
		SendInput, % Chr(22)
	Clipboard := OgClipboard
return
#IfWinActive

DisplayToolTip(msg, time := 2000)
{
	ToolTip, % msg
	SetTimer, ClearToolTip, % time*-1
}

ClearToolTip()
{
	ToolTip
}