// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import firebase from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
    signOut,
    GoogleAuthProvider,

} from 'firebase/auth'
import { getFirestore, collection, query, doc, setDoc, getDoc, getDocs, orderBy } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAfNNvcmt5RJPuZnG7_a3_UeCX8o8Q7BFo",
    authDomain: "restaurantapp-8a368.firebaseapp.com",
    databaseURL: "https://restaurantapp-8a368-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-8a368",
    storageBucket: "restaurantapp-8a368.appspot.com",
    messagingSenderId: "955500208521",
    appId: "1:955500208521:web:b18e40ce35b5098d834158",
    measurementId: "G-MYYQ4R393R"
};

// Initialize Firebase
//firebase.initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore();

const provider = new GoogleAuthProvider();

// export const checkUserState = onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid;
//         console.log(uid);
//         // ...
//     } else {
//         // User is signed out
//         // ...
//     }
// });
// export const loginWithGoogle = (auth, provider) => {
//     signInWithRedirect(auth, provider)
//         .then((result) => {
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             const user = result.user;

//             console.log(user)
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }
//const userDocRef = auth.currentUser?.email

export async function getOrderData(email) {
    const docRef = doc(db, "orders", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return JSON.stringify(docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}
//--------------------------------------------------------------------------------------------
export async function getUserData(email) {
    const docRef = await doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return JSON.stringify(docSnap.data())
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}
//--------------------------------------------------------------------------------------------

export async function addOrderToFireBase(user, items, restaurantName) {

    const ordersRef = collection(db, "orders");
    try {
        await setDoc(doc(ordersRef, auth.currentUser.email), {
            email: auth.currentUser?.email,
            items: items,
            restaurantName: restaurantName
        });

    } catch (err) {
        console.error("Error adding document: ", err);
    }


    // try {
    //     const docRef = await addDoc(collection(db, `users/${auth.currentUser?.email}/orders`), {
    //         user: auth.currentUser.email,
    //         items: items,
    //         restaurantName: restaurantName
    //     });
    //     console.log("Document written with ID: ", docRef.id);
    // } catch (e) {
    //     console.error("Error adding document: ", e);
    // }
}

export async function registerNewUsr(auth, email, password, phone, name) {

    const usersRef = collection(db, "users");

    await createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            console.log("User creation success!")
        })
        .catch(error => {
            console.log(error)
        })

    try {
        await setDoc(doc(usersRef, email), {
            phone: phone,
            name: name,
            email: email,
        });
        alert("You are registered Successfully!")

    } catch (err) {
        alert("Error occured: ", err);
    }

};
// export const updateNewUsr = (name, phone) => {

//     updateProfile(auth.currentUser, {
//         displayName: name, phoneNumber: phone
//     }).then(() => {
//         alert("Profile Successfully Updated!")

//         console.log("USER_IS: " + user.displayName + " _ " + "PHONE_IS: " + user.phoneNumber)
//     }).catch((error) => {
//         alert("Oops an error occured :" + error.message)
//     });
// }


export const login = (auth, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Successfully logged in")
        })

        .catch(err => {
            alert(err.message)
        })
}



export const logoutUser = () => {
    signOut(auth).then(() => {
        alert("Logged out successfully")
        //navigation.navigate("Home")
    }).catch((error) => {
        alert("An error occured: " + error.message)
    });

}

