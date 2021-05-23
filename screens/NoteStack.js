import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import NoteScreen from "./NoteScreen";

const InnerStack = createNativeStackNavigator();

export default function NoteStack(){  
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

