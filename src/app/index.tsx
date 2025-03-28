import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator, Animated, Easing, ImageBackground } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font"; // Import the useFonts hook

// Import your image asset using relative path

export default function Index() {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        'Lilita One': require('../../assets/fonts/LilitaOne-Regular.ttf'), // Replace with your font file path
    });



    useEffect(() => {
        setTimeout(() => {
            router.replace("/login");
        }, 5000); // Wait for 5 seconds before redirecting
    }, []);

    if (!fontsLoaded) {
        console.log("index log");
    }

    return (
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: "50%" }}>
            <Animated.Text
                style={[
                    {
                        fontSize: 36,
                        fontWeight: "bold",
                        color: "#e84393",
                        fontFamily: "Lilita One",
                    },
                ]}
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
