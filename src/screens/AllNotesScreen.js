import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Button } from "react-native"
import { supabase } from "../utils/hooks/supabase";
import Icon from 'react-native-vector-icons/Feather';


export default function AllNotesScreen() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);


    async function fetchNotes() {
        const { data, error } = await supabase
            .from('notesTable')
            .select('id,header, created_at')
        if (error) {
            console.error("Error fetching notes: ", error.message);
            return;
        }
        console.log("calls fetchNotes, data: ", data)

        setNotes(data);
        setLoading(false);
    }

    async function deleteNote(noteId) {
        const { error } = await supabase
            .from('notesTable')
            .delete()
            .eq('id', noteId)

        if (error) {
            console.error("Error deleting note: ", error.message);
            return;
        }

        // to refresh local state & render notes
        setNotes(prev => prev.filter((note) => note.id !== noteId));
    }

    useEffect(() => {
        fetchNotes();
        console.log("calls use Effect, notes: ", notes);

    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.header}</Text>
            <Text style={styles.subtitle}>{item.created_at.slice(0,10)}</Text>
            <Pressable onPress={() => deleteNote(item.id)} style={styles.trashButton}>
                <Icon name="trash-2" size={24} color="rgb(255,0,0)" />
                {/* <Text style={styles.trashIcon}>🗑️</Text> */}
            </Pressable>
        </View>
    );
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.notesList}
                data={notes} //The array of data you want to render
                renderItem={renderItem} // function that returns the component to render for each item
                keyExtractor={item => item.id.toString()} 	//func that returns a unique key for each item
            />

            <Pressable
                style={styles.plus}
                onPress={() => {
                    console.log("New note + clicked");
                }}>
                <Icon name="plus" size={30} color="white" />
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    notesList: {
        //backgroundColor: "#f0f0f0", //Softer background
        paddingTop: 20,
    },
    item: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 35,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "500",
        color: "#333",
        flexShrink: 1,
    },
    trashButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    trashIcon: {
    },

    plus: {
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


