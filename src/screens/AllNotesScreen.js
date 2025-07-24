import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Button,
} from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useNavigation } from "@react-navigation/native";

export default function AllNotesScreen() {
  const [notes, setNotes] = useState([]); //for navigation
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  async function fetchNotes() {
    const { data, error } = await supabase
      .from("notesTable")
      .select("id, header");
    if (error) {
      console.error("Error fetching notes: ", error.message);
      return;
    }
    console.log("calls fetchNotes, data: ", data);

    setNotes(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchNotes();
    console.log("calls use Effect, notes: ", notes);
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        console.log(item.header, "was pressed");
        //here we will pass the id from the item
        //so that when we press it will send to notes page
        navigation.navigate("Note", {});
      }}
    >
      <View style={styles.item}>
        <Text style={styles.title}>{item.header}</Text>
      </View>
    </Pressable>
  );
  return (
    <View>
      <FlatList
        style={styles.notesList}
        data={notes} //The array of data you want to render
        renderItem={renderItem} // function that returns the component to render for each item
        keyExtractor={(item) => item.id.toString()} //func that returns a unique key for each item
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
    backgroundColor: "rgb(255, 0, 0)",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
