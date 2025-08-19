import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import MessagesPane from "./MessagesPane";
import ChatsPane from "./ChatsPane";
import type { ChatProps, MessageProps } from "../types";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { supabase } from "../SupabaseClient";

export default function MyMessages() {
  useLockBodyScroll();

  const [chats, setChats] = React.useState<ChatProps[]>([]);
  const [selectedChat, setSelectedChat] = React.useState<ChatProps | null>(
    null
  );

  React.useEffect(() => {
    const fetchChats = async () => {
      const { data, error } = await supabase
        .from("chats")
        .select("id, created_at, sender_id"); // just get sender_id

      if (error) {
        console.error(error);
        return;
      }

      if (!data) return;

      // Map chats with dummy sender info for testing
      const formattedChats: ChatProps[] = data.map((chat: any) => ({
        id: chat.id,
        sender: {
          name: "User " + chat.sender_id?.slice(0, 6),
          username: "user_" + chat.sender_id?.slice(0, 6),
          avatar: "/default.png",
          online: false,
        },
        messages: [],
      }));

      setChats(formattedChats);
      if (formattedChats.length > 0) setSelectedChat(formattedChats[0]);
    };

    fetchChats();
  }, []);

  React.useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat) return;

      const { data, error } = await supabase
        .from("messages")
        .select("id, content, created_at, unread, sender_id")
        .eq("chat_id", selectedChat.id)
        .order("created_at", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      if (!data) return;

      const formattedMessages: MessageProps[] = data.map((msg: any) => ({
        id: msg.id,
        content: msg.content,
        timestamp: msg.created_at,
        unread: msg.unread,
        sender: {
          name: "User " + msg.sender_id?.slice(0, 6),
          username: "user_" + msg.sender_id?.slice(0, 6),
          avatar: "/default.png",
          online: false,
        },
      }));

      setChats((prev) =>
        prev.map((c) =>
          c.id === selectedChat.id ? { ...c, messages: formattedMessages } : c
        )
      );

      setSelectedChat((prev) =>
        prev ? { ...prev, messages: formattedMessages } : prev
      );
    };

    fetchMessages();
  }, [selectedChat?.id]);

  return (
    <Sheet
      sx={{
        flex: 1,
        width: "100%",
        mx: "auto",
        pt: { xs: "var(--Header-height)", md: 0 },
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "minmax(min-content, min(30%, 400px)) 1fr",
        },
      }}
    >
      <Sheet
        sx={{
          position: { xs: "fixed", sm: "sticky" },
          transform: {
            xs: "translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))",
            sm: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 100,
          width: "100%",
          top: 52,
        }}
      >
        <ChatsPane
          chats={chats}
          selectedChatId={selectedChat?.id ?? ""}
          setSelectedChat={setSelectedChat}
        />
      </Sheet>
      {selectedChat && <MessagesPane chat={selectedChat} />}
    </Sheet>
  );
}
