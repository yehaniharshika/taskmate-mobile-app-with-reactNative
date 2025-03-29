import React, { useState, useEffect, useRef } from "react";
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
import AppLoading from "expo-app-loading";

interface Task {
    id: string;
    description: string;
    time: string;
    date: string;
    completed: boolean;
}

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentEntry, setCurrentEntry] = useState({ id: "", description: "", time: "", date: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    // Load fonts
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
            await updateDoc(doc(db, "tasks", currentEntry.id), {
                description: currentEntry.description,
                time: currentEntry.time,
                date: selectedDate,
            });
            alert("Task updated successfully!");
        } else {
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
        setCurrentEntry(task);
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

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.container}>

            <Animated.Text style={[styles.screenTitle, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                Welcome to TaskMate 😍
            </Animated.Text>

            <View style={styles.card}>
                <Calendar
                    onDayPress={onDayPress}
                    style={styles.calendar}
                    theme={{
                        todayTextColor: '#e84393',
                        fontSize:12,
                        textDayFontFamily: 'Montserrat-SemiBold',
                        textMonthFontFamily: 'Montserrat-SemiBold',
                        textDayHeaderFontFamily: 'Montserrat-SemiBold'
                    }}
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
                                                <Ionicons name={task.completed ? 'checkbox' : 'square-outline'} size={26} color="#e84393" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => deleteTask(task.id)} style={[styles.iconButton, styles.deleteButton]}>
                                                <Ionicons name="trash" size={15} color="white" />
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
                        <TextInput style={styles.input} value={currentEntry.description} onChangeText={(text) => setCurrentEntry({ ...currentEntry, description: text })} placeholder="Task Description" />
                        <TextInput style={styles.input} value={currentEntry.time} onChangeText={(text) => setCurrentEntry({ ...currentEntry, time: text })} placeholder="Task Time" />
                        <Text style={styles.selectedDate}>Selected Date: {selectedDate || "No Date Selected"}</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={handleAddTask} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>{isEditing ? "Update" : "Add"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={[styles.modalButton, styles.cancelButton]}>
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
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    screenTitle: {
        fontSize: 22,
        fontFamily: "Montserrat-Bold",
        textAlign: "center",
        marginVertical: 20,
        color: "#333",
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        elevation: 5,
        marginBottom: 20,
        borderWidth:2,
        borderColor: "#e84393"
    },
    calendar: {
        borderRadius: 10,
    },
    taskListContainer: {
        flex: 1,
    },
    taskCardContainer: {
        marginBottom: 20,
    },
    taskDate: {
        fontSize: 11,
        fontFamily: "Montserrat-Bold",
        marginBottom: 10,
        color: "#b71540",
    },
    taskCard: {
        backgroundColor: "#ffd9fa",
        borderRadius: 10,
        padding: 15,
        elevation: 3,
        borderWidth:2,
        borderColor: "#e84393"
    },
    taskItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    taskText: {
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
    },
    taskActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButton: {
        padding: 5,
    },
    deleteButton: {
        backgroundColor: "#e84393",
        borderRadius: 5,
        padding: 4,
        marginLeft: 10,
        fontSize:9
    },
    addButton: {
        position: "absolute",
        bottom: 30,
        right: 30,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontFamily: "Montserrat-Regular",
        fontSize:12
    },
    selectedDate: {
        fontSize: 12,
        fontFamily: "Montserrat-Bold",
        textAlign: "center",
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalButton: {
        backgroundColor: "#e84393",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: "#ccc",
    },
    modalButtonText: {
        color: "#fff",
        fontFamily: "Montserrat-SemiBold",
        fontSize:12
    },
});


export default Home;
