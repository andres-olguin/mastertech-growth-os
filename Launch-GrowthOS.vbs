Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\andre\mastertech-growth-os"

WshShell.Run "powershell -WindowStyle Hidden -Command ""Stop-Process -Id (Get-NetTCPConnection -LocalPort 4000).OwningProcess -Force -ErrorAction SilentlyContinue""", 0, True
WshShell.Run "cmd /c npm run dev:api", 0, False
WScript.Sleep 3500
WshShell.Run "cmd /c npx electron apps/desktop/main.js", 0, False
