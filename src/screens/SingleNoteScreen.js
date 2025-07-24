import { useState, useEffect, use } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { supabase } from "../utils/hooks/supabase";
export default function SingleNoteScreen({ route, navigation }) {
    const { id } = route.params;
    const [note, setNote] = useState([]);
    const [body, setBody] = useState('');
    const [header, setHeader] = useState('');

    async function fetchNote() {
        const { data, error } = await supabase
            .from("notesTable")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            console.error("Error fetching notes: ", error.message);
            return;
        }
        setNote(data);
        setBody(data.body);
        setHeader(data.header);
    }
    async function updateNote() {
        const { error } = await supabase
            .from('notesTable')
            .update({ body: body, header: header, updated_at: new Date().toISOString() })
            .eq('id', id);
        if (error) {
            console.error("Error updating notes: ", error.message);
        }
        console.log("Note saved");
        // console.log("Updated time: ", updated_at);
    }
    useEffect(() => {
        fetchNote();
    }, []);
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TextInput
                    style={styles.headerTitle}
                    multiline
                    value={header}
                    onChangeText={setHeader}
                    placeholder="Untitled"
                />
            </View>
            {/* Note Box */}
            <View style={styles.noteBox}>
                <TextInput
                    style={styles.body}
                    multiline
                    value={body}
                    onChangeText={setBody}
                    placeholder="Write your note here..."
                    textAlignVertical="top"
                />
            </View>
            {/* Floating Save Button */}
            <Pressable
                style={styles.check}
                onPress={async () => {
                    await updateNote();  //Updates the note (save)
                    navigation.goBack(); //Navs back to AllNotesScreen
                }}>
                <Icon name="check" size={28} color="white" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5", // Matches the white-ish background
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
    },
    noteBox: {
        flex: 1,
        backgroundColor: "#D9D9D9",
        borderRadius: 30,
        padding: 20,
    },
    noteTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,
    },
    body: {
        flex: 1,
        fontSize: 16,
    },
    check: {
        position: "absolute",
        bottom: 50,
        right: 170,
        backgroundColor: "#007AFF",
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
});





