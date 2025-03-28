import React, { useState } from "react";
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

const loadFonts = async () => {
    await Font.loadAsync({
        MontserratRegular: require("../../../assets/fonts/Montserrat-Regular.ttf"), // Regular font
        MontserratBold: require("../../../assets/fonts/Montserrat-Bold.ttf"), // Bold font
    });
};

const AddTask = () => {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);

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
                    createdAt: Timestamp.now(), // Correct Firebase timestamp
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
                    label="Add your task here..."
                    value={description}
                    onChangeText={setDescription}
                    mode="outlined"
                    multiline
                    numberOfLines={4}
                    style={[styles.input, styles.textArea]}
                />
                <TextInput
                    label="Date"
                    value={date.toDateString()}
                    mode="outlined"
                    style={styles.input}
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
                    label="Time"
                    value={time}
                    onChangeText={setTime}
                    mode="outlined"
                    style={styles.input}
                />
                <Button mode="contained" onPress={handleAddTask} style={styles.button}>
                    Add Task
                </Button>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: "#f5f5f5"},
    card: { padding: 30, borderRadius: 10, elevation: 5 , backgroundColor: "#ffbcf7",fontFamily: "MontserratBold" },
    heading: { textAlign: "center", fontWeight: "bold", marginBottom: 20 ,fontFamily: "MontserratBold"},
    input: { marginBottom: 15 ,fontFamily: "MontserratBold"},
    textArea: { height: 100 ,},
    button: { marginTop: 20,backgroundColor:"#e84393" },
});

export default AddTask;
