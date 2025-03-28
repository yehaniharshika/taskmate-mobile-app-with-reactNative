import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts, LilitaOne_400Regular } from "@expo-google-fonts/lilita-one";

export default function Index() {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        LilitaOne: LilitaOne_400Regular,
    });

    useEffect(() => {
        setTimeout(() => {
            router.replace("/login");
        }, 5000);
    }, []);

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#747d8c" />;
    }

    return (
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: "50%" }}>
            <Animated.Text
                style={{
                    fontSize: 36,
                    fontWeight: "bold",
                    color: "#e84393",
                    fontFamily: "LilitaOne",
                }}
            >
                TaskMate
            </Animated.Text>

            <ActivityIndicator size="large" color="#747d8c" style={{ marginTop: 20 }} />
            <Text style={{ color: "#747d8c", marginTop: 10 }}>Loading...</Text>

            <View style={{ flexDirection: "row", marginTop: 30 }}>
                <FontAwesome name="circle" size={15} color="#e84393" />
                <FontAwesome name="circle" size={15} color="#e84393" style={{ marginLeft: 5 }} />
                <FontAwesome name="circle" size={15} color="#e84393" style={{ marginLeft: 5 }} />
            </View>
        </View>
    );
}

