import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert("Success", "Account created successfully!");
            router.replace("/login");
        } catch (error) {
            Alert.alert("Error");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.screenTitle}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSignup}>
                <Text style={styles.modalButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace("/login")}>
                <Text style={styles.taskText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center" },
    screenTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: "#333",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        width: "100%",
    },
    modalButton: {
        backgroundColor: "#2196F3",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    taskText: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginTop: 10,
    },
});
