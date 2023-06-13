import { Text, FlatList, View } from "react-native";
import { useState, useEffect } from "react";
import { fetcher } from "../utils/fetcher";

export default function Index() {
    const [users, setUsers] = useState([]);

    const renderItem = ({ item }) => {
        return (
          <View>
            <Text>{item.name}</Text>
          </View>
        );
    };

    useEffect(() => {
        // Simulating an asynchronous API call
        const getAllUsers = async () => {
            const data = await fetcher("users", "get");
            setUsers(data.users);
        };
    
        // Call the fetchUsers function to retrieve the users
        getAllUsers();
      }, []);

    return (
        <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
    );
}
