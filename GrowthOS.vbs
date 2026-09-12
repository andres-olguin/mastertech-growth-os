Set WshShell = CreateObject("WScript.Shell")
WshShell.Run chr(34) & WshShell.CurrentDirectory & "\Launch-GrowthOS.bat" & Chr(34), 0
Set WshShell = Nothing