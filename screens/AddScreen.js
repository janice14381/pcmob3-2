import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function AddScreen({navigation}){
    return (
        <View>
          <Text>this is add screen</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 10}}>
            <Text style={{ color: "orange"}}>Dimiss</Text>
          </TouchableOpacity>
        </View>
    
    );
}