
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../components/restaurantDetail/OrderItem";
import LottieView from "lottie-react-native";


export default function Cart({ navigation }) {

    const [loading, setLoading] = useState(false);

    const { items, restaurantName } = useSelector(
        (state) => state.cartReducer.selectedItems
    );

    const total = items
        .map((item) => Number(item.price.replace("$", "")))
        .reduce((prev, curr) => prev + curr, 0);

    const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });



    return (

        <View style={styles.modalCheckoutContainer}>

            <TouchableOpacity

                onPress={() => {
                    //addOrderToFireBase();
                    //setModalVisible(false);
                    navigation.navigate("Home");
                }}
            >

                <Text style={{
                    marginTop: "20%",
                    marginBottom: -70,
                    color: "black",
                    alignSelf: "center",
                    fontSize: 30
                }}>Cart</Text>

            </TouchableOpacity>

            {totalUSD == 0 ? (
                <>
                    <Text style={styles.restaurantName}>No Items found in cart.</Text>
                    <LottieView
                        style={{ height: 200, alignSelf: "center", marginBottom: 30 }}
                        source={require("../assets/animations/noitem.json")}
                        autoPlay
                        speed={0.5}
                        loop={false}
                    />
                </>

            ) : (

                <View>

                    <Text style={styles.restaurantName}>{restaurantName}</Text>
                    {items.map((item, index) => (
                        <OrderItem key={index} item={item} />
                    ))}
                    <View style={styles.subtotalContainer}>
                        <Text style={styles.subtotalText}>Subtotal</Text>
                        <Text>{totalUSD}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                backgroundColor: "black",
                                alignItems: "center",
                                padding: 13,
                                borderRadius: 30,
                                width: 300,
                                position: "relative",
                            }}
                            onPress={() => {
                                //addOrderToFireBase();
                                //setModalVisible(false);
                                navigation.navigate("Home");
                            }}
                        >
                            <Text style={{ color: "white", fontSize: 20 }}>Go Back  |  Your Total is:</Text>
                            <Text
                                style={{
                                    position: "absolute",
                                    right: 20,
                                    color: "white",
                                    fontSize: 15,
                                    top: 17,
                                }}
                            >
                                {total ? `$` + totalUSD : ""}
                            </Text>
                        </TouchableOpacity>



                    </View>


                </View>

            )}





        </View>
    )
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.7)",
    },

    modalCheckoutContainer: {
        backgroundColor: "white",
        padding: 16,

        borderWidth: 1,
    },

    restaurantName: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 18,
        marginBottom: 10,
        marginTop: "60%"
    },

    subtotalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },

    subtotalText: {
        textAlign: "left",
        fontWeight: "600",
        fontSize: 15,
        marginBottom: 10,
    },
});



