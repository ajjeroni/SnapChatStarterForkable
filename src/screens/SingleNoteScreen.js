import { useState, useEffect } from "react";
import { View, Text, Pressable, Button, TextInput, StyleSheet } from "react-native";
import { supabase } from "../utils/hooks/supabase";

export default function SingleNoteScreen({ route }) {
    const { id } = route.params;
    const [note, setNote] = useState([]);
    const [header, setHeader] = useState('');
    const [text, onChangeText] = useState('');

    async function fetchNote() {
        const { data, error } = await supabase
            .from("notesTable")
            .select("*")
            .eq("id", id) // Filter by id (dummy data: 1)
            .single();
        if (error) {
            console.error("Error fetching notes: ", error.message);
            return;
        }
        console.log("calls fetchNotes, data by id: ", data);

        setNote(data);
        onChangeText(data.body)
    }

    async function updateNote() {
        const { data, error } = await supabase
            .from('notesTable')
            .update({ body: text })
            .eq('id', id )
            .select()
        if (error) {
            console.error("Error updating notes: ", error.message);
            return;
        }
        console.log("calls updateNotes, updates data body by id");

    }

    useEffect(() => {
        fetchNote();
    }, []);


    return (
        <View>
            <View>
                <Text>{note.header}</Text>
            </View>
            <View>
                <TextInput
                    style={styles.body}
                    //placeholder={note.body}
                    onChangeText={onChangeText}
                    value={text}
                />

            </View>
            <Pressable>
                <Button
                    onPress={() => {
                        console.log("Note Saved");
                        updateNote();
                    }}
                    title="Save"
                />
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    body: {
        backgroundColor: "rgb(255,0,0)",
    },

    
});