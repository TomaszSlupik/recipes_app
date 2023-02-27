import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBdxvlE5ghYGxgiC0FyjhZtsOMgb8HAGTA",
    authDomain: "recipesapp-aadc3.firebaseapp.com",
    databaseURL: "https://recipesapp-aadc3-default-rtdb.firebaseio.com",
    projectId: "recipesapp-aadc3",
    storageBucket: "recipesapp-aadc3.appspot.com",
    messagingSenderId: "885998386047",
    appId: "1:885998386047:web:adc555d917b8403e0e384a"
  };
  
  const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)