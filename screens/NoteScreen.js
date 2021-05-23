import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const db = SQLite.openDatabase('notes.db');

export default function NoteScreen({navigation, route}){
  const [listArray, setListArray] = useState([]);
  /*const [listArray, setListArray] = useState([
    {
      task: "task0",
      done: true,
      id:"0"
    },
    {
      task: "task1",
      done: false,
      id:"1"
    },
    {
      task: "task2",
      done: true,
      id:"2"
    }

  ]);*/

  function refreshNotes(){
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes",
        null,
        (txObj, {rows:{ _array}}) => setListArray(_array),
        (txObj, error) => console.log("error ", error)
      );
    });
  }

  useEffect(() => {
      db.transaction((tx)=>{
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, done INT);'
        );
      },
      null,
      refreshNotes
      );
    }, []);

  useEffect(
    () =>{
      navigation.setOptions({
        headerRight: () =>(
          <TouchableOpacity onPress={addNote}>
            <SimpleLineIcons
              name="note"
              size={20}
              color="black"
              style={{marginRight:20}}
            />  
          </TouchableOpacity>
        )
      })
    }

  );

  useEffect(
    () =>{
      if(route.params?.text){
        console.log(route.params.text);
        db.transaction(
          (tx) => {
            tx.executeSql("INSERT INTO notes (done, title) VALUES (0,?)",[route.params.text,]);
          },
          null,
          refreshNotes
        );  
        /*const newNote = {
          task: route.params.text,
          done: false,
          id: listArray.length.toString(),
        };
        setListArray([...listArray, newNote]);*/
      }  

    },[route.params?.text]
  );

  function addNote(){
    navigation.navigate("Add Screen")
  /*  let newNote = {
      task: "new Notes",
      done: false,
      id: ListArray.length.toString(),    
    };

    setListArray([...ListArray,newNote]);
  */

    
  }



  function renderItem({item}){
    return (
        <View 
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
          <Text style={{padding:5}}>{item.id}</Text> 
          <Text style={{padding:5}}>{item.title}</Text> 
          <TouchableOpacity onPress={() => deleteNote(item.id)}>
            <SimpleLineIcons name="trash" size={16} color="#944" />
          </TouchableOpacity>
        </View>  
    );
  }

  return(
    <View style={styles.container}>
      <FlatList style={{ width : "100%",}} data={listArray} renderItem={renderItem} keyExtractor={(item)=>item.id}>note</FlatList>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});