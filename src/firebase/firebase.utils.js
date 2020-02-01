import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyARLTOeGBax25dBjNje_E6Loa96eqxNuX0",
    authDomain: "jetcake-fcff6.firebaseapp.com",
    databaseURL: "https://jetcake-fcff6.firebaseio.com",
    projectId: "jetcake-fcff6",
    storageBucket: "jetcake-fcff6.appspot.com",
    messagingSenderId: "706447257297",
    appId: "1:706447257297:web:1afed9cc8643755dcf1ff0",
    measurementId: "G-2L9HNZE9TK"
  };

  
export const createUserProfileDocument = async (userAuth ,additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();
    if(!snapshot.exits){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log("Error Creating",error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'});

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;