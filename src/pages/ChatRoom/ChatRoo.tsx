import { over, Client, Message } from "stompjs";
import SockJS from "sockjs-client";
import { useState, useEffect } from "react";

interface ChatMessage {
  senderName: string;
  receiverName?: string;
  message: string;
  status: "JOIN" | "MESSAGE";
}

const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map<string, ChatMessage[]>());
    const [publicChats, setPublicChats] = useState<ChatMessage[]>([]);
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: "",
        receivername: "",
        connected: false,
        message: "",
    });

    let stompClient: Client | null = null;

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const connect = () => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        stompClient?.subscribe("/chatroom/public", onMessageReceived);
        stompClient?.subscribe(
            "/user/" + userData.username + "/private",
            onPrivateMessage
        );
        userJoin();
    };

const userJoin = () => {
    var chatMessage: ChatMessage = {
        senderName: userData.username,
        message: "",  
        status: "JOIN",
    };
    stompClient?.send("/app/message", {}, JSON.stringify(chatMessage));
};

    const onMessageReceived = (payload: Message) => {
        var payloadData = JSON.parse(payload.body) as ChatMessage;
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    };

    const onPrivateMessage = (payload: Message) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body) as ChatMessage;
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName)?.push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list: ChatMessage[] = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    };

    const onError = (err: any) => {
        console.log(err);
    };

    const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserData({ ...userData, message: value });
    };
    const sendValue = () => {
        if (stompClient) {
            var chatMessage: ChatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE",
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: "" });
        }
      
    };
    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage: ChatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE",
            };

            if (userData.username !== tab) {
                if (privateChats.get(tab)) {
                    privateChats.get(tab)!.push(chatMessage);
                    setPrivateChats(new Map(privateChats));
                } else {
                    let list: ChatMessage[] = [];
                    list.push(chatMessage);
                    privateChats.set(tab, list);
                    setPrivateChats(new Map(privateChats));
                }
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: "" });
        }
    };

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setUserData({ ...userData, username: value });
    };

    const registerUser = () => {
        connect();
    };
    return (
        <div>
            {/* JSX for the ChatRoom component */}
            <div>
                <input type="text" onChange={handleUsername} value={userData.username} />
                <button onClick={registerUser}>Register</button>
            </div>
            <div>
                <input
                    type="text"
                    onChange={handleMessage}
                    value={userData.message}
                    disabled={!userData.connected}
                />
                <button onClick={sendValue} disabled={!userData.connected}>
                    Send
                </button>
                <select
                    value={tab}
                    onChange={(e) => setTab(e.target.value)}
                    disabled={!userData.connected}
                >
                    {/* Options for selecting private chat recipient */}
                </select>
                <button onClick={sendPrivateValue} disabled={!userData.connected}>
                    Send Private
                </button>
            </div>
            {/* Render the chat messages */}
        </div>
    );
}