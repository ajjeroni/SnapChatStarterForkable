import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Button } from "react-native"
import { supabase } from "../utils/hooks/supabase";
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from "@react-navigation/native";


export default function AllNotesScreen() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();


    async function fetchNotes() {
        const { data, error } = await supabase
            .from('notesTable')
            .select('id,header, created_at, updated_at')
        if (error) {
            console.error("Error fetching notes: ", error.message);
            return;
        }
        console.log("calls fetchNotes, data: ", data)

        //sort descending (most recent first) in js
        const sortedNotes = data.sort((a, b) => {
            const dateA = new Date(a.updated_at || a.created_at);
            const dateB = new Date(b.updated_at || b.created_at);
            return dateB - dateA;
        });

        setNotes(sortedNotes);
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

    useFocusEffect(

        useCallback(() => {
            fetchNotes();
            console.log("calls use Effect, notes: ", notes);
        }, [])
    );




    const renderItem = ({ item }) => (
        <Pressable
            onPress={() => {
                console.log(item.header, " was pressed");
                navigation.navigate("Single Note", { id: item.id });
                console.log("Item clicked id: ", item.id);
            }}
        >
            <View style={styles.item}>
                <Text style={styles.title}>{item.header}</Text>
                <Text style={styles.subtitle}>{item.created_at.slice(0, 10)}</Text>
                <Pressable onPress={() => deleteNote(item.id)} style={styles.trashButton}>
                    <Icon name="trash-2" size={24} color="rgb(255,0,0)" />
                    {/* <Text style={styles.trashIcon}>🗑️</Text> */}
                </Pressable>

            </View>
        </Pressable>

    );
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.notesList}
                data={notes} //The array of data you want to render
                renderItem={renderItem} // function that returns the component to render for each item
                keyExtractor={item => item.id.toString()} 	//func that returns a unique key for each item
            //inverted={true}
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


