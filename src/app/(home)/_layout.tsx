import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";

import { StreamChat } from "stream-chat";
import ChatProvider from "@/src/providers/ChatProvider";
import { useAuth } from "@/src/providers/AuthProvider";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);

export default function HomeLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }
  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ChatProvider>
  );
}
