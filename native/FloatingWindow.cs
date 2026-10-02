using System;
using System.IO;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Threading;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.Wpf;

public sealed class FloatingWindow : Window {
    readonly JavaScriptSerializer json = new JavaScriptSerializer();
    readonly Dictionary<string,object> config;
    readonly WebView2CompositionControl view = new WebView2CompositionControl();
    readonly DispatcherTimer watchdog = new DispatcherTimer();
    readonly string origin;
    bool closing; bool reported;
    static void Report(object data) { Console.WriteLine(new JavaScriptSerializer().Serialize(data)); Console.Out.Flush(); }
    public FloatingWindow(Dictionary<string,object> input) {
        config=input;
        var uri=new Uri((string)config["url"]);
        if(uri.Scheme!="http" || uri.Host!="127.0.0.1" || !uri.AbsolutePath.StartsWith("/live2d-stage/")) throw new Exception("Invalid local stage URL");
        origin=uri.GetLeftPart(UriPartial.Authority);
        Title="Live2D 桌面悬浮"; Width=350; Height=470; MinWidth=240; MinHeight=300;
        WindowStyle=WindowStyle.None; AllowsTransparency=true; Background=Brushes.Transparent;
        Topmost=true; ShowInTaskbar=false; ResizeMode=ResizeMode.NoResize; ShowActivated=false;
        Left=Math.Max(0,SystemParameters.WorkArea.Right-Width-24);Top=Math.Max(0,SystemParameters.WorkArea.Bottom-Height-30);
        view.DefaultBackgroundColor=System.Drawing.Color.Transparent;Content=view;
        // Composition input can omit DOM dblclick after capture: forward the native double-click too.
        PreviewMouseLeftButtonDown+=async(s,e)=>{if(e.ClickCount==2 && view.CoreWebView2!=null){var point=e.GetPosition(view);var coords=json.Serialize(new{x=point.X,y=point.Y});try{await view.CoreWebView2.ExecuteScriptAsync("window.dispatchEvent(new CustomEvent('live2d-native-doubleclick',{detail:"+coords+"}))");}catch{}}};
        try{var path=Path.Combine(Path.GetDirectoryName((string)config["profile"]),"window-position.json");if(File.Exists(path)){var saved=json.Deserialize<Dictionary<string,double>>(File.ReadAllText(path));Left=Math.Max(SystemParameters.VirtualScreenLeft,Math.Min(SystemParameters.VirtualScreenLeft+SystemParameters.VirtualScreenWidth-80,saved["left"]));Top=Math.Max(SystemParameters.VirtualScreenTop,Math.Min(SystemParameters.VirtualScreenTop+SystemParameters.VirtualScreenHeight-80,saved["top"]));}}catch{}
        PreviewKeyDown+=async(s,e)=>{if(e.Key==Key.Escape && view.CoreWebView2!=null){try{await view.CoreWebView2.ExecuteScriptAsync("window.dispatchEvent(new Event('live2d-native-escape'))");}catch{}}};
        Loaded+=async(s,e)=>{try{await Initialize();}catch(Exception error){Report(new{type="error",message=error.Message});Close();}};
        Closed+=(s,e)=>{closing=true;watchdog.Stop();view.Dispose();Report(new{type="closed"});};
        watchdog.Interval=TimeSpan.FromSeconds(2);watchdog.Tick+=(s,e)=>{try{if(Process.GetProcessById(Convert.ToInt32(config["parentPid"])).HasExited)Close();}catch{Close();}};watchdog.Start();
    }
    async Task Initialize() {
        var environment=await CoreWebView2Environment.CreateAsync(null,(string)config["profile"],new CoreWebView2EnvironmentOptions("--autoplay-policy=no-user-gesture-required"));
        await view.EnsureCoreWebView2Async(environment);
        var core=view.CoreWebView2;
        core.Settings.AreDevToolsEnabled=false;core.Settings.AreDefaultContextMenusEnabled=false;core.Settings.IsStatusBarEnabled=false;
        core.AddWebResourceRequestedFilter("*",CoreWebView2WebResourceContext.All);
        core.WebResourceRequested+=(s,e)=>{
            var uri=new Uri(e.Request.Uri);
            if(uri.GetLeftPart(UriPartial.Authority)==origin && uri.AbsolutePath.StartsWith("/live2d-stage/"))e.Request.Headers.SetHeader("X-Live2D-Float",(string)config["token"]);
            else e.Response=environment.CreateWebResourceResponse(new MemoryStream(),403,"Forbidden","");
        };
        core.NavigationStarting+=(s,e)=>{if(e.Uri!=(string)config["url"])e.Cancel=true;};
        core.NewWindowRequested+=(s,e)=>e.Handled=true;
        core.PermissionRequested+=(s,e)=>e.State=CoreWebView2PermissionState.Deny;
        core.DownloadStarting+=(s,e)=>e.Cancel=true;
        core.WebMessageReceived+=async(s,e)=>{
            if(e.Source!=(string)config["url"])return;
            var message=e.TryGetWebMessageAsString();
            if(message=="ready" && !reported){
                reported=true;
                Report(new{type="ready",handle=new System.Windows.Interop.WindowInteropHelper(this).Handle.ToInt64(),transparent=AllowsTransparency,topmost=Topmost});
                if(config.ContainsKey("screenshot")){
                    await Task.Delay(1800); if(closing)return;
                    var bitmap=new RenderTargetBitmap((int)ActualWidth,(int)ActualHeight,96,96,PixelFormats.Pbgra32);bitmap.Render(this);
                    var png=new PngBitmapEncoder();png.Frames.Add(BitmapFrame.Create(bitmap));using(var file=File.Create((string)config["screenshot"]))png.Save(file);
                    Report(new{type="screenshot"});
                }
            } else if(message=="focus"){Activate();view.Focus();Keyboard.Focus(view);}
            else if(message=="close")Close();
            else if(message=="reset"){Width=402;Height=470;Left=Math.Max(0,SystemParameters.WorkArea.Right-Width-24);Top=Math.Max(0,SystemParameters.WorkArea.Bottom-Height-24);try{File.WriteAllText(Path.Combine(Path.GetDirectoryName((string)config["profile"]),"window-position.json"),json.Serialize(new{left=Left,top=Top}));}catch{}}
            else if(message.StartsWith("layout:") && message.Length<4096){try{var data=json.Deserialize<Dictionary<string,string>>(message.Substring(7));if(data["key"].StartsWith("live2d-stage.layout.native.") && data["key"].Length<160){var path=Path.Combine(Path.GetDirectoryName((string)config["profile"]),"model-layouts.json");var layouts=File.Exists(path)?json.Deserialize<Dictionary<string,string>>(File.ReadAllText(path)):new Dictionary<string,string>();layouts[data["key"]]=data["value"];File.WriteAllText(path,json.Serialize(layouts));}}catch{}}
            else if(message=="save"){try{File.WriteAllText(Path.Combine(Path.GetDirectoryName((string)config["profile"]),"window-position.json"),json.Serialize(new{left=Left,top=Top}));}catch{}}
            else if(message.StartsWith("move:") || message.StartsWith("resize:")){
                var parts=message.Split(':');double x,y;
                if(parts.Length==3 && double.TryParse(parts[1],System.Globalization.NumberStyles.Float,System.Globalization.CultureInfo.InvariantCulture,out x) && double.TryParse(parts[2],System.Globalization.NumberStyles.Float,System.Globalization.CultureInfo.InvariantCulture,out y) && !double.IsNaN(x) && !double.IsNaN(y) && !double.IsInfinity(x) && !double.IsInfinity(y)){
                    if(parts[0]=="resize"){Width=Math.Max(240,Math.Min(1372,x));Height=Math.Max(300,Math.Min(1200,y));Left=Math.Max(SystemParameters.VirtualScreenLeft,Math.Min(SystemParameters.VirtualScreenLeft+SystemParameters.VirtualScreenWidth-Width,Left));Top=Math.Max(SystemParameters.VirtualScreenTop,Math.Min(SystemParameters.VirtualScreenTop+SystemParameters.VirtualScreenHeight-Height,Top));}
                    else {Left+=Math.Max(-2000,Math.Min(2000,x));Top+=Math.Max(-2000,Math.Min(2000,y));}
                }
            }
        };
        try{var path=Path.Combine(Path.GetDirectoryName((string)config["profile"]),"model-layouts.json");if(File.Exists(path)){var layouts=json.Deserialize<Dictionary<string,string>>(File.ReadAllText(path));await core.AddScriptToExecuteOnDocumentCreatedAsync("try{for(const [k,v] of Object.entries("+json.Serialize(layouts)+")){if(k.startsWith('live2d-stage.layout.native.'))localStorage.setItem(k,v);}}catch{}");}}catch{}
        core.Navigate((string)config["url"]);
        Task.Run(()=>{try{while(Console.ReadLine()!=null){} }catch{} Dispatcher.BeginInvoke(new Action(()=>{if(!closing)Close();}));});
    }
    [STAThread] public static void Main() {
        try{var line=Console.ReadLine();if(line==null)return;var config=new JavaScriptSerializer().Deserialize<Dictionary<string,object>>(line);new Application().Run(new FloatingWindow(config));}
        catch(Exception e){Report(new{type="error",message=e.ToString()});Environment.ExitCode=1;}
    }
}
