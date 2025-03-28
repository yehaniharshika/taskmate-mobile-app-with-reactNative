import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AppLoading from 'expo-app-loading';
import { useFonts, LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';
import { useFonts as useMontserrat, Montserrat_500Medium } from '@expo-google-fonts/montserrat';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/login");
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    let [fontsLoaded] = useFonts({ LilitaOne_400Regular });
    let [montserratLoaded] = useMontserrat({ Montserrat_500Medium });

    if (!fontsLoaded || !montserratLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: "50%" }}>
                <Text
                    style={{
                        fontSize: 44,
                        paddingVertical: 6,
                        fontFamily: 'LilitaOne_400Regular',
                        color: "#e84393",
                        textShadowColor: "darkred",
                        textShadowOffset: { width: 2, height: 2 },
                        textShadowRadius: 3,
                    }}
                >
                    TaskMate
                </Text>

                <ActivityIndicator size="large" color="#747d8c" style={{ marginTop: 20 }} />
                <Text
                    style={{
                        color: "#747d8c",
                        marginTop: 10,
                        fontFamily: "Montserrat_500Medium",
                        fontSize: 14
                    }}
                >
                    Loading...
                </Text>

                <View style={{ flexDirection: "row", marginTop: 30 }}>
                    <FontAwesome name="circle" size={15} color="#e84393" />
                    <FontAwesome name="circle" size={15} color="#e84393" style={{ marginLeft: 5 }} />
                    <FontAwesome name="circle" size={15} color="#e84393" style={{ marginLeft: 5 }} />
                </View>
            </View>
        );
    }
}
