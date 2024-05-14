import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";

import { StreamChat } from "stream-chat";
import ChatProvider from "@/src/providers/ChatProvider";
import { useAuth } from "@/src/providers/AuthProvider";

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
