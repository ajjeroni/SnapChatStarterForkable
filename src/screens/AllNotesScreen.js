import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native";

export default function AllNotesScreen() {

    
    /*
    const DATA = [
        {
            id: "1",
            title: "First Item",
        },
        {
            id: "2",
            title: "Second Item",
        },
        {
            id: "3",
            title: "Third Item",
        },
        {
            id: "4",
            title: "Fourth Item",
        },
    ];
    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
    */
    return (
        <View >
            <FlatList style={styles.notesList}
                // data={DATA}
                // renderItem={({ item }) => <Item title={item.title} />}
                // keyExtractor={item => item.id}
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