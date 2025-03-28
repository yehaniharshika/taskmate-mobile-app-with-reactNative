import React, {useState, useEffect, useRef} from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TextInput,
    ScrollView,
    Animated,
    Easing
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { collection, query, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import * as Font from "expo-font";


interface Task {
    id: string;
    description: string;
    time: string;
    date: string;
    completed: boolean;
}

const loadFonts = async () => {
    await Font.loadAsync({
        MontserratRegular: require("../../../assets/fonts/Montserrat-Regular.ttf"), // Regular font
        MontserratBold: require("../../../assets/fonts/Montserrat-Bold.ttf"), // Bold font
    });
};

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentEntry, setCurrentEntry] = useState({ id: "", description: "", time: "", date: "" });
    const [isEditing, setIsEditing] = useState(false); // To track if it's edit mode

    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        loadFonts()
            .then(() => setFontsLoaded(true))
            .catch((error) => console.log(error));
    }, []);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const q = query(collection(db, "tasks"));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const taskList: Task[] = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Task, "id">),
                }));
                setTasks(taskList);
            });
            return () => unsubscribe();
        }, [])
    );

    const onDayPress = (day: { dateString: string }) => {
        setSelectedDate(day.dateString);
    };

    const handleAddTask = async () => {
        if (!selectedDate || !currentEntry.description || !currentEntry.time) {
            alert("Please fill all fields!");
            return;
        }

        if (isEditing) {
            // If editing, update the task in Firebase
            await updateDoc(doc(db, "tasks", currentEntry.id), {
                description: currentEntry.description,
                time: currentEntry.time,
                date: selectedDate,
            });
            alert("Task updated successfully!");
        } else {
            // If adding new task
            await addDoc(collection(db, "tasks"), {
                description: currentEntry.description,
                time: currentEntry.time,
                date: selectedDate,
                completed: false,
            });
        }

        setCurrentEntry({ id: "", description: "", time: "", date: "" });
        setIsEditing(false);
        setIsModalVisible(false);
    };

    const handleEditTask = (task: Task) => {
        setCurrentEntry(task); // Set the selected task data
        setSelectedDate(task.date);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
        await updateDoc(doc(db, "tasks", taskId), { completed: !completed });
    };

    const deleteTask = async (taskId: string) => {
        await deleteDoc(doc(db, "tasks", taskId));
    };

    return (
        <View style={styles.container}>

            <Animated.Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 20,
                    color: "#333",
                    fontFamily: "MontserratBold",
                    opacity: fadeAnim, // Fade-in effect
                    transform: [{ scale: scaleAnim }], // Scale effect
                }}
            >
                Welcome to TaskMate😍
            </Animated.Text>

            <View style={styles.card}>
                <Calendar
                    onDayPress={onDayPress}
                    style={styles.calendar}
                    theme={{ todayTextColor: '#00adf5' }}
                />
            </View>

            <ScrollView style={styles.taskListContainer}>
                {Object.entries(
                    tasks.reduce((acc, task) => {
                        if (!acc[task.date]) acc[task.date] = [];
                        acc[task.date].push(task);
                        return acc;
                    }, {} as Record<string, Task[]>)
                ).map(([date, tasksForDate]) => (
                    <View style={styles.taskCardContainer} key={date}>
                        <Text style={styles.taskDate}>{date}</Text>
                        <View style={styles.taskCard}>
                            {tasksForDate.map((task) => (
                                <TouchableOpacity key={task.id} onPress={() => handleEditTask(task)}>
                                    <View style={styles.taskItem}>
                                        <Text style={styles.taskText}>{task.description} at {task.time}</Text>
                                        <View style={styles.taskActions}>
                                            <TouchableOpacity onPress={() => toggleTaskCompletion(task.id, task.completed)} style={styles.iconButton}>
                                                <Ionicons name={task.completed ? 'checkbox' : 'square-outline'} size={24} color="black" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => deleteTask(task.id)} style={[styles.iconButton, styles.deleteButton]}>
                                                <Ionicons name="trash" size={20} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity onPress={() => { setIsEditing(false); setIsModalVisible(true); }} style={styles.addButton}>
                <Ionicons name="add-circle" size={60} color="#e84393" />
            </TouchableOpacity>

            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            value={currentEntry.description}
                            onChangeText={(text) => setCurrentEntry({ ...currentEntry, description: text })}
                            placeholder="Task Description"
                        />
                        <TextInput
                            style={styles.input}
                            value={currentEntry.time}
                            onChangeText={(text) => setCurrentEntry({ ...currentEntry, time: text })}
                            placeholder="Task Time"
                        />
                        <Text style={{ marginBottom: 15 ,fontFamily: "MontserratBold",}}>Selected Date: {selectedDate || "No Date Selected"}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", width: "60%", alignItems: "center" }}>
                            <TouchableOpacity onPress={handleAddTask} style={[styles.modalButton, { flex: 1, marginRight: 5 }]}>
                                <Text style={styles.modalButtonText}>{isEditing ? "Update Task" : "Add Task"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={[styles.modalButton, { flex: 1, backgroundColor: "gray", marginLeft: 5 }]}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
    screenTitle: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#333" ,fontFamily: "MontserratBold"},
    card: { backgroundColor: "#fff", borderRadius: 10, padding: 10, marginBottom: 20 },
    taskListContainer: { flex: 1 },
    taskCardContainer: { marginBottom: 16 },
    calendar: {
        borderRadius: 10,
        fontFamily: "MontserratBold",
    },
    taskActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    taskDate: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
    taskCard: { backgroundColor: "#ffbcf7", padding: 12, borderRadius: 8 },
    taskItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#ddd", paddingBottom: 8, marginBottom: 12 },
    taskText: { fontSize: 16, color: "#333" ,fontFamily:"MontserratRegular"},
    iconButton: { padding: 5, marginLeft: 10 },
    deleteButton: { backgroundColor: "red", borderRadius: 5, padding: 5 },
    addButton: { position: "absolute", bottom: 30, right: 30 },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
        fontFamily: "MontserratRegular",
        fontSize: 10,
    },
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
    modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
    modalButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },

    modalButtonText: { color: "#fff", fontWeight: "bold" ,fontFamily: "MontserratBold",},
});

export default Home;
