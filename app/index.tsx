

import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import Profile from "./profile";
import Home from "./(tabs)/Home";
import { useAuthStore } from "@/src/store/authstore";

export default function Index() {

const token = useAuthStore((state)=>state.token)
  
if (!token) return null 
  return token ? <Redirect href="/(tabs)/Home" /> : <Redirect href="/login" />;
}
