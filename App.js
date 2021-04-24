
import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { SimpleLineIcons } from '@expo/vector-icons';



const Stack = createNativeStackNavigator();
const db = SQLite.openDatabase('notes.db');

function NoteScreen({navigation}){
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Notes" 
        component={NoteScreen} 
        options={{
          headerTitle: "Todo Apps",
          headerTitleStyle:{
            fontWeight: "bold",
            fontSize: 25,
          },
          headerStyle:{
            height: 120,
            backgroundColor: "yellow",            
          }
        }}
        
        />
      </Stack.Navigator>
    </NavigationContainer>
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

