import { useState, useEffect } from "react";
import { View, Text, Pressable, Button } from "react-native";
import { supabase } from "../utils/hooks/supabase";

export default function SingleNoteScreen({ route }) {
    const { id } = route.params;

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
        console.log("calls fetchNotes, data: ", data);
    }
    useEffect(() => {
        fetchNote();
    }, []);
    return (
        <View>
            <View>
                <Text>Header</Text>
            </View>
            <View>
                <Text>Body</Text>
            </View>
            <Pressable>
                <Button
                    onPress={() => {
                        console.log("Note Saved");
                    }}
                    title="Save"
                />
            </Pressable>
        </View>
    );
}