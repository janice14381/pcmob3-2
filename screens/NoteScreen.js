import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity,} from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function NotesScreen({ navigation }) {
    const [ListArray, setListArray] = useState([
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
    
      function addNote(){
        let newNote = {
          task: "new Notes",
          done: false,
          id: ListArray.length.toString(),    
        };
    
        setListArray([...ListArray,newNote]);
      }
    
      function renderItem({item}){
        return (
            <View style={{
              padding: 15,
              width: "100%",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1
            }}>
              <Text>{item.task}</Text> 
            </View>  
        );
      }
    
      return(
        <View style={styles.container}>
          <FlatList style={{ width : "100%"}} data={ListArray} renderItem={renderItem} keyExtractor={(item)=>item.name}>note</FlatList>
        </View>
      );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#ffc",
   alignItems: "center",
   justifyContent: "center",
 },
});





