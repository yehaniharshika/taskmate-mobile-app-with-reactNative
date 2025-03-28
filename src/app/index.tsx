import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator, Animated, Easing, ImageBackground } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font"; // Import the useFonts hook
// Import your image asset
import backgroundImage from '../../assets/img/taskmate.png'; // Replace with your image path

export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fontSize, setFontSize] = useState(new Animated.Value(0)); // For typing animation

    // Load the "Lilita One" font using the useFonts hook
    const [fontsLoaded] = useFonts({
        'Lilita One': require('../../assets/fonts/LilitaOne-Regular.ttf'), // Replace with your font file path
    });

    const animateText = () => {
        Animated.timing(fontSize, {
            toValue: 1,
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        setTimeout(() => {
            router.replace("/login");
        }, 5000); // Wait for 5 seconds before redirecting

        animateText(); // Start the typing animation
    }, []);

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#fff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <ImageBackground
            source={backgroundImage} // Set the image as background
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: "30%" }}> {/* Adjusted marginTop */}
                <Animated.Text
                    style={{
                        fontSize: 36,
                        fontWeight: "bold",
                        color: "#e84393",
                        fontFamily: 'Lilita One', // Now using the custom font
                        letterSpacing: fontSize.interpolate({
                            inputRange: [0, 1],
                            outputRange: [10, 2],
                        }),
                    }}
                >
                    TaskMate
                </Animated.Text>

                <ActivityIndicator size="large" color="#747d8c" style={{ marginTop: 20 }} />

                <Text style={{ color: '#747d8c', marginTop: 10 }}>Loading...</Text>

                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <FontAwesome name="circle" size={15} color="#e84393" />
                    <FontAwesome name="circle" size={15} color="#e84393" style={{ marginLeft: 5 }} />
                    <FontAwesome name="circle" size={15} color="#e84393" style={{ marginLeft: 5 }} />
                </View>
            </View>
        </ImageBackground>
    );
}
