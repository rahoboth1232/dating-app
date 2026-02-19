import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set)=>({
    user: null,
    token: null,

    login: async (token) =>{
        await AsyncStorage.setItem('token', token);
        set({token});
    },
    logout: async ()=>{
        await AsyncStorage.removeItem('token');
        set({token: null, user: null});

    },

    loadToken:async()=>{
        const token = await AsyncStorage.getItem('token');
        if(token){
            set({token});
        }   
    }

}))   