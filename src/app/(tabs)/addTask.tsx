import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text, TextInput, Button } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addTask } from "../../reducer/taskSlice";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import * as Font from "expo-font";

// Define TypeScript types for navigation
type RootStackParamList = {
    Home: undefined;
    AddTask: undefined;
};

const AddTask = () => {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                "Montserrat-Regular": require("../../../assets/fonts/Montserrat-Regular.ttf"),
                "Montserrat-Medium": require("../../../assets/fonts/Montserrat-Medium.ttf"),
                "Montserrat-SemiBold": require("../../../assets/fonts/Montserrat-SemiBold.ttf"),
                "Montserrat-Bold": require("../../../assets/fonts/Montserrat-Bold.ttf"),
            });
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch();

    const handleAddTask = async () => {
        if (description && time && date) {
            try {
                const newTask = {
                    description,
                    date,
                    time,
                    completed: false,
                    createdAt: Timestamp.now(),
                };

                const docRef = await addDoc(collection(db, "tasks"), newTask);
                dispatch(addTask({ id: docRef.id, description, date, time, completed: false }));
                console.log("Task added to Firestore and Redux Store");
            } catch (error) {
                console.error("Error saving task:", error);
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card style={styles.card}>
                <Text variant="headlineMedium" style={styles.heading}>
                    What are you planning? 😇
                </Text>

                <TextInput
                    style={[styles.input, { fontFamily: "Montserrat-Medium" }]}
                    placeholder="Add your task here..."
                    placeholderTextColor="#aaa"
                    value={description}
                    onChangeText={setDescription}
                />
                <TextInput
                    style={[styles.input, { fontFamily: "Montserrat-Medium" }]}
                    placeholder="Date (e.g., 2023-03-29)"
                    placeholderTextColor="#aaa"
                    value={date}
                    onChangeText={setDate}
                />
                <TextInput
                    style={[styles.input, { fontFamily: "Montserrat-Medium" }]}
                    placeholder="Time"
                    placeholderTextColor="#aaa"
                    value={time}
                    onChangeText={setTime}
                />
                <Button mode="contained" onPress={handleAddTask} style={styles.button} labelStyle={styles.buttonText}>
                    Add Task
                </Button>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5" },
    card: { padding: 30, borderRadius: 10, elevation: 5, backgroundColor: "#ffd9fa" },
    heading: { textAlign: "center", fontFamily: "Montserrat-Bold", marginBottom: 20, fontSize: 17 },
    input: {
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "white",
        fontSize: 12,
        fontFamily: "Montserrat-Medium",
    },
    button: { marginTop: 20, backgroundColor: "#e84393" },
    buttonText: {
        fontFamily: "Montserrat-SemiBold",
        fontSize: 13,
    },
});

export default AddTask;
