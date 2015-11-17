using Fleck;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FouMemorizer.Fleck
{
    public class FleckServer
    {
        static List<IWebSocketConnection> allSockets = new List<IWebSocketConnection>();
        static WebSocketServer server;

        public static void StartEcho()
        {
            server = new WebSocketServer("ws://0.0.0.0:8181");
            server.Start(socket =>
            {
                socket.OnOpen = () => Console.WriteLine("Open!");
                socket.OnClose = () => Console.WriteLine("Close!");
                socket.OnMessage = message => socket.Send(message);
            });
        }

        public static void StartBroadcast()
        {
            server = new WebSocketServer("ws://0.0.0.0:8181");
            server.Start(socket =>
            {
                socket.OnOpen = () => allSockets.Add(socket);
                socket.OnClose = () => allSockets.Remove(socket);
                socket.OnMessage = message =>
                {
                    foreach (var s in allSockets.ToList())
                        s.Send(message);
                };
            });
        }
    }
}