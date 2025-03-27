import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace("/login");
        }, 2000);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>TaskMate</Text>
            <ActivityIndicator size="large" />
        </View>
    );
}
