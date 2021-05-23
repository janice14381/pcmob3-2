import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

export default function NoteScreen({navigation, route}){
  const [listArray, setListArray] = useState([
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

  ]);

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
        const newNote = {
          task: route.params.text,
          done: false,
          id: listArray.length.toString(),
        };
        setListArray([...listArray, newNote]);
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
        <View style={{
          padding: 15,
          width: "100%",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row"
        }}>
          <Text style={{padding:5}}>{item.id}</Text> 
          <Text style={{padding:5}}>{item.task}</Text> 
          <Text style={{padding:5}}>{item.done}</Text> 
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