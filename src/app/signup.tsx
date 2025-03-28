import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Card } from "react-native-paper";
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
} from '@expo-google-fonts/montserrat';

const Signup = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    let [fontsLoaded] = useFonts({
        Montserrat_100Thin,
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
        Montserrat_900Black,
    });

    // Wait for fonts to load before rendering the UI
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                uid: user.uid,
            });

            Alert.alert("Success", "SignUp successful!");
            console.log(name, email, password);
            router.push("login");
        } catch (error: unknown) {
            if (error instanceof Error) {
                if ((error as any).code === "auth/invalid-email") {
                    Alert.alert("Error", "Invalid email format. Please enter a valid email.");
                } else if ((error as any).code === "auth/email-already-in-use") {
                    Alert.alert("Error", "This email is already registered. Try logging in.");
                } else {
                    Alert.alert("Error", error.message || "SignUp failed");
                }
            } else {
                Alert.alert("Error", "An unexpected error occurred.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Text style={[styles.title, { fontFamily: 'Montserrat_700Bold' }]}>Sign Up</Text>
                <TextInput
                    style={[styles.input, { fontFamily: 'Montserrat_400Regular' }]}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={[styles.input, { fontFamily: 'Montserrat_400Regular' }]}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={[styles.input, { fontFamily: 'Montserrat_400Regular' }]}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
                    <Text style={[styles.btnText, { fontFamily: 'Montserrat_600SemiBold' }]}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("login")}>
                    <Text style={[styles.loginText, { fontFamily: 'Montserrat_500Medium' }]}>
                        Already have an account? <Text style={[styles.loginLink,{ fontFamily: 'Montserrat_400Regular' }]}>Log in</Text>
                    </Text>
                </TouchableOpacity>
            </Card>
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffbcf7",
    },
    card: {
        padding: 20,
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 3,
        borderColor: "#6F1E51"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        fontFamily: 'Montserrat_700Bold'
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 13
    },
    signupBtn: {
        backgroundColor: "#e84393",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontSize: 12
    },
    loginText: {
        marginTop: 10,
        textAlign: "center",
    },
    loginLink: {
        color: "#007bff",
        fontWeight: "bold",
        fontSize: 12,
        fontFamily: 'Montserrat_700Bold',
    },
});
