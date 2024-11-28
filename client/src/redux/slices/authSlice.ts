import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js"

const secret_key = import.meta.env.VITE_SECRET_KEY

const encryptedDataFromStorage = localStorage.getItem('userInfo');
let decryptedData = null;

if (encryptedDataFromStorage) {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedDataFromStorage, secret_key);
        decryptedData = bytes.toString(CryptoJS.enc.Utf8); // Get the decrypted string
    } catch (error) {
        console.error("Error decrypting data:", error);
    }
}

const initialState = {
    user:decryptedData ? JSON.parse(decryptedData) : null,
    isSidebarOpen:false,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials: (state,action)=>{
            state.user = action.payload
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(state.user),secret_key).toString()
            localStorage.setItem('userInfo',encryptedData)
        },

        logout: (state) => {
            state.user = null
            localStorage.removeItem('userInfo')
        },

        setOpenSidebar: (state,action)=> {
            state.isSidebarOpen = action.payload
        }
    }
})

export default authSlice.reducer

export const {setCredentials, logout, setOpenSidebar} = authSlice.actions