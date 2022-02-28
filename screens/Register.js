import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Error from "../components/Error";
import { registerNewUsr, loginWithGoogle, provider, auth } from "../firebase";


import EasyButton from "../components/EasyButton";
import navigation from '@react-navigation/core'
import UserProfile from "./UserProfile";

const Register = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function register() {
        if (email === "" || password === "" || name === "" || phone === "") {
            setError("Please fill in the form correctly");
        }
        else if (auth.currentUser) {

            navigation.navigate("ViewCart");

        }
        else if (!auth.currentUser) {

            await registerNewUsr(auth, email, password, phone, name);
            //updateNewUsr(name, phone);
            navigation.navigate("Home")
        }

    };

    return (
        <>
            <FormContainer title={"Register"}>
                <Input
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    name={"email"}
                    id={"email"}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <Input
                    placeholder={"Name"}
                    name={"name"}
                    id={"name"}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder={"Phone Number"}
                    name={"phone"}
                    id={"phone"}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"Password"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </View>
                <View>
                    <EasyButton large primary onPress={() => register()}>
                        <Text style={{ color: "white", fontSize: 20 }}>Register</Text>
                    </EasyButton>
                </View>
                <View>
                    <EasyButton
                        large
                        secondary
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{ color: "white", fontSize: 20 }}>Back to Login</Text>
                    </EasyButton>

                </View>
            </FormContainer>

        </>

    )
}


const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        margin: 10,
        alignItems: "center",
    },
});

export default Register;


 // let user = {
        //     name: name,
        //     email: email,
        //     password: password,
        //     phone: phone,
        //     isAdmin: false,
        // };

        // axios
        //     .post(`${baseURL}users/register`, user)
        //     .then((res) => {
        //         if (res.status == 200) {
        //             alert("Registration Successful! You can now login")
        //             setTimeout(() => {
        //                 props.navigation.navigate("Login");
        //             }, 500);
        //         }
        //     })
        //     .catch((error) => {
        //         alert(error)
        //     });