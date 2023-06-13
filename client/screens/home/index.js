import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { fetcher } from "../../utils/fetcher";
import { useState, useEffect } from "react";
import { FlatList, View } from "react-native";

const Home = () => {
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
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            />
        </Layout>
    )
}

export default Home