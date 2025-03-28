import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text, TextInput, Button } from "react-native-paper";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addTask } from "../../reducer/taskSlice";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

// Define TypeScript types for navigation
type RootStackParamList = {
    Home: undefined;
    AddTask: undefined;
};

const AddTask = () => {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(""); // Changed to string instead of Date object
    const [time, setTime] = useState("");

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
    });

    if (!fontsLoaded) {
        return <AppLoading/>
    }

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
                    placeholder="Add your task here..."
                    value={description}
                    onChangeText={setDescription}
                    numberOfLines={2}
                    placeholderTextColor="#aaa"
                    style={[styles.input, styles.textArea, { fontFamily: 'Montserrat_500Medium' }]}
                />
                <TextInput
                    placeholder="Date (e.g., 2023-03-29)"
                    value={date}
                    onChangeText={setDate}
                    style={[styles.input, { fontFamily: 'Montserrat_500Medium' }]}
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    placeholder="Time"
                    value={time}
                    onChangeText={setTime}
                    style={[styles.input, { fontFamily: 'Montserrat_500Medium' }]}
                    placeholderTextColor="#aaa"
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
    card: { padding: 30, borderRadius: 10, elevation: 5, backgroundColor: "#ffbcf7" },
    heading: { textAlign: "center", fontFamily: 'Montserrat_500Medium', marginBottom: 20, fontSize: 18 },
    input: {
        marginBottom: 15,
        fontFamily: 'Montserrat_500Medium',
        borderWidth: 2,
        borderColor: "#e84393",
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "white",
        fontSize: 15,
    },
    textArea: { height: 80 },
    button: { marginTop: 20, backgroundColor: "#e84393" },
    buttonText: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 16,
    },
});

export default AddTask;
