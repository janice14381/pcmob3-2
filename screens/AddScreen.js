import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

export default function AddScreen({navigation}){
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