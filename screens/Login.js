import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Error from "../components/Error";
import EasyButton from "../components/EasyButton";
import { login, user, auth, addOrderToFireBase, registerNewUsr } from "../firebase";
import Register from "./Register";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import * as Google from 'expo-google-app-auth';
// const auth = app.auth();
// const db = app.firestore();


const Login = ({ navigation }) => {

    //const context = useContext(AuthGlobal);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { items, restaurantName } = useSelector(
        (state) => state.cartReducer.selectedItems
    );


    async function setLoginTime() {
        await login(auth, email, password)
    }

    async function order() {
        await addOrderToFireBase(auth.currentUser, items, restaurantName);
    }

    const loginUSR = async () => {
        await setLoginTime();
        await order();
    }
    const Back = () => (
        <View>
            <TouchableOpacity
                onPress={navigation.navigate("Home")}
            >
                <Text style={{ fontSize: 20 }}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    )

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user && !restaurantName) {
                navigation.navigate("UserProfile")
                console.log("User is: " + user.email)
            }
        })
        return unsubscribe;
    }, [])



    // async function handleGoogleSignIn() {
    //     const config = {
    //         iosClientId: `566370422332-qp2fvl5qos33pasfviqc0tbmd9nuqmkk.apps.googleusercontent.com`,
    //         androidClientId: `566370422332-1gbdajaq1vj5rpqh98pqdbsci6snpqf7.apps.googleusercontent.com`,
    //         scopes: ['profile', 'email']
    //     }
    //     Google.logInAsync(config)
    //         .then((result) => {
    //             const { type, user } = result;
    //             const { email, name } = user;
    //             if (type == 'success') {

    //                 //await registerNewUsr(auth, email)

    //                 alert("Sign In Successful")

    //                 console.log(user)


    //             } else {


    //                 alert("Signin Cancelled!")
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             alert("error")
    //         })
    // }


    const handleSubmit = async () => {


        if (email === "" || password === "") {
            setError("Please fill in your credentials");
        } else if (items && restaurantName) {
            // loginUser(user, context.dispatch)
            // setCurrentUser(context.stateUser.isAuthenticated, user)

            //loginUSR();
            setLoginTime();
            navigation.navigate("Home");
            alert("Please tap a restaurant to conitinue :)")


        } else if (!items && restaurantName) {

            await login(auth, email, password);
            navigation.navigate("Home")
        }
        else if (!auth.currentUser) {
            await login(auth, email, password);

            navigation.navigate("Home");
        }


    };
    const checkAuth = () => {
        navigation.navigate("UserProfile")
    }

    return (

        <>
            {user ? checkAuth : (

                <View>
                    <FormContainer title={"Login"}>
                        <Input
                            placeholder={"Enter Email"}
                            name={"email"}
                            id={"email"}
                            value={email}
                            onChangeText={(text) => setEmail(text.toLowerCase())}
                        />
                        <Input
                            placeholder={"Enter Password"}
                            name={"password"}
                            id={"password"}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <View style={styles.buttonGroup}>
                            {error ? <Error message={error} /> : null}
                            <EasyButton large primary onPress={() => handleSubmit()}>
                                <Text style={{ color: "white", fontSize: 20 }}>Sign In</Text>
                            </EasyButton>

                        </View>
                        <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
                            <Text style={styles.middleText}>Don't have an account yet?</Text>
                            <EasyButton
                                large
                                secondary
                                onPress={() =>

                                    navigation.navigate("Register")
                                }
                            >
                                <Text style={{ color: "white", fontSize: 20 }}>Register</Text>
                            </EasyButton>
                            <EasyButton
                                large
                                secondary
                                onPress={() =>

                                    navigation.navigate("Home")
                                }
                            >
                                <Text style={{ color: "white", fontSize: 20 }}>Back To Home</Text>
                            </EasyButton>

                        </View>
                    </FormContainer>




                </View>
            )}


        </>

    );
};

const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        alignItems: "center",
        fontSize: 20
    },

    middleText: {
        marginBottom: 10,
        alignSelf: "center",
        fontSize: 20
    },
});


export default Login;


// import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase"

// const auth = getAuth(firebaseApp);
// createUserWithEmailAndPassword(auth, email, password)
//     .then(userCredential => {
//         // Signed in 


//         const save = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         console.log(error)
//         // ..
//     });

// Context
//import AuthGlobal from "../Context/store/AuthGlobal";

// ui.start('#firebaseui-auth-container', {
//     signInOptions: [
//       firebase.auth.EmailAuthProvider.PROVIDER_ID
//     ],
//     // Other config options...
//   });
//const [user, loading, error] = useAuthState(auth);
    // <UserProfile navigation={navigation} />

    // useEffect(() => {
    //     if (context.stateUser.isAuthenticated === true) {
    //         navigation.navigate("UserProfile")
    //         console.log("Login Successful")

    //     } else {
    //         navigation.navigate("Login")

    //     }
    // }, [context.stateUser.isAuthenticated]);