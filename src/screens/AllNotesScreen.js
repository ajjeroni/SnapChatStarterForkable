import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Button } from "react-native"
import { supabase } from "../utils/hooks/supabase";

export default function AllNotesScreen() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);


    async function fetchNotes() {
        const { data, error } = await supabase
            .from('notesTable')
            .select('id,header')
        if (error) {
            console.error("Error fetching notes: ", error.message);
            return;
        }
        console.log("calls fetchNotes, data: ", data)
        
        setNotes(data);
        setLoading(false);
    }
       useEffect(()=> {
        fetchNotes();
        console.log("calls use Effect, notes: ",notes);

    }, []);

       const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.header}</Text>
        </View>
    );
    return (
        <View >
            <FlatList 
                style={styles.notesList} 
                data={notes} //The array of data you want to render
                renderItem={renderItem} // function that returns the component to render for each item
                keyExtractor={item => item.id.toString()} 	//func that returns a unique key for each item
            />

            <Pressable>
                <Button
                    onPress={() => {
                        console.log("New note + clicked");
                    }}
                    title="+"
                />
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    notesList: {
        backgroundColor: "rgb(255, 0, 0)"
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
    },
    title: {
        fontSize: 32
    }

});

