
import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { SimpleLineIcons } from '@expo/vector-icons';



const Stack = createNativeStackNavigator();
const InnerStack = createNativeStackNavigator();
const db = SQLite.openDatabase('notes.db');


function NoteScreen({navigation, route}){
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
      console.log(route.params?.text);
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
          borderBottomWidth: 1
        }}>
          <Text>{item.task}</Text> 
        </View>  
    );
  }

  return(
    <View style={styles.container}>
      <FlatList style={{ width : "100%"}} data={listArray} renderItem={renderItem} keyExtractor={(item)=>item.id}>note</FlatList>
    </View>
  );
}


function NoteStack(){
  return(
    <InnerStack.Navigator>
        <InnerStack.Screen
          name="Notes"
          component={NoteScreen}
          options={{
            headerTitle: "Todo Stack Apps",
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
  
    </InnerStack.Navigator>  

  );
}

function AddScreen({navigation}){
  const [text, setText] = useState('');

  return (
    <View style={{ flex:1, alignItems:"center",justifyContent:"center"}}>
      <Text style={{padding:10}} >Add Your Todo?</Text>
      <TextInput style={{width:"80%", borderWidth:1, borderColor: "#ccc", padding:15}} onChangeText={(newText) => {
        setText(newText);
// console.log(text)
      } }></TextInput>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => navigation.navigate("Notes", {text})} style={{margin:5, padding: 10, backgroundColor:"orange"}}>
          <Text style={{ color: "white"}}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{margin:5, padding: 10, backgroundColor:"red"}}>
          <Text style={{ color: "white"}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen 
        name="Notes Stack" 
        component={NoteStack} 
        options={{
          headerShown: false
        }}
        
        />
        <Stack.Screen name="Add Screen" component={AddScreen}/>
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

