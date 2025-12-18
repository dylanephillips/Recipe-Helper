import { Image } from "react-native";
import { Tabs } from "expo-router";
import React from "react";

// Displays the layoput for the bottom navigation 
const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
            title: "",
            tabBarIcon: ({ size }) => (
                <Image source={require("../../assets/home.png")} style={{ width: size, height: size }} />
            ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
            title: "",
            tabBarIcon: ({ size }) => (
                <Image source={require("../../assets/Search_Icon.png")} style={{ width: size, height: size }} />
            ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
