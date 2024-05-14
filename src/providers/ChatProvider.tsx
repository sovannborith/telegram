import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./AuthProvider";
import { supabase } from "../lib/supabase";
import { tokenProvider } from "../utils/tokenProvider";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY!);

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    if (!profile) return;
    try {
      const connect = async () => {
        await client.connectUser(
          {
            id: profile?.id,
            name: profile?.full_name,
            image: supabase.storage
              .from("avatars")
              .getPublicUrl(profile.avatar_url).data.publicUrl,
          },
          tokenProvider
        );
        setIsReady(true);
      };
      connect();

      return () => {
        if (isReady) {
          client.disconnectUser();
        }
        setIsReady(false);
      };
    } catch (err) {
      console.log(err);
    }
  }, [profile?.id]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}
