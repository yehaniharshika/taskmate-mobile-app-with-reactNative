import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text, TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
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

// Load custom fonts
const loadFonts = async () => {
    await Font.loadAsync({
        MontserratRegular: require("../../../assets/fonts/Montserrat-Regular.ttf"),
        MontserratBold: require("../../../assets/fonts/Montserrat-Bold.ttf"),
    });
};

const AddTask = () => {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        loadFonts()
            .then(() => setFontsLoaded(true))
            .catch((error) => console.log(error));
    }, []);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const dispatch = useDispatch();

    const handleAddTask = async () => {
        if (description && time && date) {
            try {
                const newTask = {
                    description,
                    date: date.toDateString(),
                    time,
                    completed: false,
                    createdAt: Timestamp.now(),
                };

                const docRef = await addDoc(collection(db, "tasks"), newTask);
                dispatch(addTask({ id: docRef.id, description, date: date.toDateString(), time, completed: false }));
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
                    style={[styles.input, styles.textArea]}
                />
                <TextInput
                    placeholder="Date"
                    value={date.toDateString()}
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    onFocus={() => setShowDatePicker(true)}
                    showSoftInputOnFocus={false}
                />
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) setDate(selectedDate);
                        }}
                    />
                )}
                <TextInput
                    placeholder="Time"
                    value={time}
                    onChangeText={setTime}
                    style={styles.input}
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
    heading: { textAlign: "center", fontFamily: "MontserratBold", marginBottom: 20, fontSize: 18,},
    input: {
        marginBottom: 15,
        fontFamily: "MontserratRegular",
        borderWidth: 2,
        borderColor: "#e84393",
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "white",
        fontSize: 15,
    },
    textArea: { height: 80 },
    button: { marginTop: 20, backgroundColor: "#e84393" },
    buttonText: { fontFamily: "MontserratBold", fontSize: 16 },
});

export default AddTask;
