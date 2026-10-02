param([Parameter(Mandatory=$true)][string]$SdkDirectory)
$ErrorActionPreference='Stop'
$dependency=Get-Content -LiteralPath (Join-Path $PSScriptRoot 'dependency.json') -Raw | ConvertFrom-Json
foreach($file in $dependency.files){$actual=(Get-FileHash -LiteralPath (Join-Path $SdkDirectory $file.path) -Algorithm SHA256).Hash;if($actual -ne $file.sha256){throw ('WebView2 dependency hash mismatch: '+$file.path)}}
$root=Split-Path $PSScriptRoot -Parent
$output=Join-Path $root 'lib\native'
New-Item -ItemType Directory -Path $output -Force | Out-Null
foreach($name in @('Microsoft.Web.WebView2.Core.dll','Microsoft.Web.WebView2.Wpf.dll')){Copy-Item -LiteralPath (Join-Path $SdkDirectory "lib\net462\$name") -Destination $output -Force}
Copy-Item -LiteralPath (Join-Path $SdkDirectory 'runtimes\win-x64\native\WebView2Loader.dll') -Destination $output -Force
Copy-Item -LiteralPath (Join-Path $SdkDirectory 'LICENSE.txt') -Destination (Join-Path $output 'WebView2-LICENSE.txt') -Force
Copy-Item -LiteralPath (Join-Path $SdkDirectory 'NOTICE.txt') -Destination (Join-Path $output 'WebView2-NOTICE.txt') -Force
$framework='C:\Windows\Microsoft.NET\Framework64\v4.0.30319'
$refs=@('System.dll','System.Core.dll','System.Drawing.dll','System.Web.Extensions.dll','WPF\WindowsBase.dll','WPF\PresentationCore.dll','WPF\PresentationFramework.dll','System.Xaml.dll') | ForEach-Object { '/reference:'+(Join-Path $framework $_) }
$refs+=@(('/reference:'+(Join-Path $output 'Microsoft.Web.WebView2.Core.dll')),('/reference:'+(Join-Path $output 'Microsoft.Web.WebView2.Wpf.dll')))
& (Join-Path $framework 'csc.exe') /nologo /target:winexe /platform:x64 ('/out:'+(Join-Path $output 'Live2DFloating.exe')) @refs (Join-Path $PSScriptRoot 'FloatingWindow.cs')
if($LASTEXITCODE -ne 0){throw 'Native floating window compilation failed'}


