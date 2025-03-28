import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="home" // Home tab is the default screen
                options={{
                    tabBarIcon: () => <FontAwesome name="home" size={24} />,
                    title: "",
                }}
            />
            <Tabs.Screen
                name="addTask"
                options={{
                    tabBarIcon: () => <FontAwesome name="plus" size={24} />,
                    title: "",
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: () => <FontAwesome name="user" size={24} />,
                    title: "",
                }}
            />
        </Tabs>
    );
}
