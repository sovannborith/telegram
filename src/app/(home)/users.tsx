import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";
import UserListItem from "@/src/components/UserListItem";

export default function UsersScreen() {
  const [users, setUsers] = useState<any[] | null>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user?.id); // exclude me

      setUsers(profiles);
    };
    fetchUsers();
  }, []);

  return (
    <FlatList
      data={users}
      contentContainerStyle={{ gap: 5 }}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
}
