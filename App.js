
import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { SimpleLineIcons } from '@expo/vector-icons';



const Stack = createNativeStackNavigator();
const db = SQLite.openDatabase('notes.db');

function addNote(){
 console.log('add notes');
}

function NoteScreen({navigation}){
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


  return(
    <View style={styles.container}>
      <Text>note</Text>
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

