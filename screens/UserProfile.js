import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import OrderItem from "../components/restaurantDetail/OrderItem";
import Input from '../components/Input';
import EasyButton from '../components/EasyButton';
import { logoutUser, auth, getOrderData, getUserData } from '../firebase';
import BottomTabs from '../components/home/BottomTabs';

const UserProfile = ({ navigation }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [orders, setOrders] = useState("");
    const [email, setEmail] = useState("");
    const signoutUser = () => {
        logoutUser();
        alert("Logged out successfully")
        navigation.navigate("Home")
    }

    const orderData = async () => {
        await setEmail(auth.currentUser?.email);
        getOrderData(email)
            .then(res => {
                var data = JSON.parse(res)

                data.items.map(ord => {
                    return setOrders(ord.title)
                })

            }).catch(
                err => console.log(err)
            )
        console.log("USR_EMAIL_CODE1: " + email)

    }

    const parseUser = async () => {
        //handle the user data from firebase 
        await setEmail(auth.currentUser?.email);
        getUserData(email)
            .then(res => {
                var data = JSON.parse(res)
                setName(data.name)
                setPhone(data.phone)
            }).catch(err => console.log(err))
        console.log("USR_EMAIL_CODE2: " + email)
    }
    useEffect(() => {
        parseUser();
        orderData();
    })


    // const updateUser = () => {
    //     updateProfile(auth.currentUser, {
    //         displayName: name, phoneNumber: phone
    //     }).then(() => {
    //         alert("Profile Successfully Updated!")
    //         navigation.navigate("ViewCart")
    //         console.log(user.displayName + " _ " + user.phoneNumber)
    //     }).catch((error) => {
    //         alert("Oops an error occured :" + error.message)
    //     });
    // }


    return (
        <>

            {/* {!user.currentUser.email ?
                (
                    <View style={styles.container}>
                        <Text>
                            Please update your Information
                        </Text>
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
                        <EasyButton large primary onPress={() => updateNewUsr()}>
                            <Text style={{ color: "white", fontSize: 20 }}>Update</Text>
                        </EasyButton>
                    </View>

                ) : ( */}
            <View>

                <ScrollView contentContainerStyle={styles.subContainer}>
                    <View style={styles.order}>

                        <Text style={{ fontSize: 20, paddingBottom: 20 }}>Hello, {name} </Text>
                        <Text style={{ fontSize: 20, paddingBottom: 20 }}> {email} </Text>
                        <Text style={{ fontSize: 20, paddingBottom: 20 }}> {phone} </Text>
                        {/* {getData()} */}
                        <Text style={{ fontSize: 20, paddingBottom: 20, textDecorationLine: "underline" }}>Your Orders:</Text>
                        {/* {orders.map((item, index) => {
                                <OrderItem key={index} item={item} />
                            })} */}<Text style={{ color: "blue", fontSize: 15 }}>{orders ? orders : <Text>No Orders Yet</Text>}</Text>






                    </View>
                    <EasyButton large primary onPress={() => signoutUser()} >
                        <Text style={{ color: "white", fontSize: 20 }}>Logout</Text>
                    </EasyButton>


                </ScrollView>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={{ fontSize: 20, alignSelf: "center", padding: 20, marginTop: "30%" }}>Back To Home </Text>
                </TouchableOpacity>


            </View>
            {/* // )} */}


        </>


    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: "30%",
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    },
    order: {
        marginTop: "30%",
        alignItems: "center",
        marginBottom: 10
    }
})

export default UserProfile;
    // const context = useContext(AuthGlobal)
    // const [userProfile, setUserProfile] = useState()
    // const [orders, setOrders] = useState()


    // useFocusEffect(
    //     useCallback(() => {


    //         if (
    //             context.stateUser.isAuthenticated === false ||
    //             context.stateUser.isAuthenticated === null
    //         ) {
    //             navigation.navigate("Login")
    //         }

    //         AsyncStorage.getItem("jwt")
    //             .then((res) => {
    //                 axios
    //                     .get(`${baseURL}users/${context.stateUser.user.userId}`, {
    //                         headers: { Authorization: `Bearer ${res}` },
    //                     })
    //                     .then((context) => setUserProfile(context))
    //                 console.log(res)

    //             })
    //             .catch((error) => console.log(error))

    //         axios
    //             .get(`${baseURL}orders`)
    //             .then((x) => {
    //                 const data = x.data;
    //                 console.log(data)
    //                 const userOrders = data.filter(
    //                     (order) => order.user._id === context.stateUser.user.userId
    //                 );
    //                 setOrders(userOrders);
    //             })
    //             .catch((error) => console.log(error))

    //         return () => {

    //             setOrders();

    //         }

    //     }, [context.stateUser.isAuthenticated]))