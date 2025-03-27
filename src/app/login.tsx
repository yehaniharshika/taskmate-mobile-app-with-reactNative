import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
    const router = useRouter();

    return (
        <View style={{ padding: 20 }}>
            <Text>Email:</Text>
            <TextInput style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
            <Text>Password:</Text>
            <TextInput
                style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
                secureTextEntry
            />
            {/* Corrected navigation */}
            <Button title="Login" onPress={() => router.replace("/home")} />
            <Button title="Signup" onPress={() => router.push("/signup")} />
        </View>
    );
}
