import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import firebase from "../firebase";
import MenuItems from "../components/restaurantDetail/MenuItems";
// import cartReducer, {defaultState} from "../redux/reducers/cartReducer";
import OrderItem from "../components/restaurantDetail/OrderItem";

export default function OrderCompleted({ navigation }) {
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "No Order yet",
        description: "Would you like assistance in ordering?",
        price: "Contact us on 0733187517",
        image:
          "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
      },
    ],
  });

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

  // useEffect(() => {
  //   const db = firebase.firestore();
  //   const unsubscribe = db
  //     .collection("orders")
  //     .orderBy("createdAt", "desc")
  //     .limit(1)
  //     .onSnapshot((snapshot) => {
  //       snapshot.docs.map((doc) => {
  //         setLastOrder(doc.data());
  //       });
  //     });

  //   return () => unsubscribe();
  // }, []);



  const Ord1 = () => {



    return (
      <>
        <LottieView
          style={{ height: 100, alignSelf: "center", marginBottom: 30, marginTop: "5%" }}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Your order at {restaurantName} has been placed for ${totalUSD}
        </Text>
        <ScrollView>
          {/* <MenuItems
          foods={lastOrder.items}
          hideCheckbox={true}
          marginLeft={10}
        /> */}
          {items.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
          <LottieView
            style={{ height: 200, alignSelf: "center" }}
            source={require("../assets/animations/cooking.json")}
            autoPlay
            speed={0.5}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={{ fontSize: 20, alignSelf: "center", padding: 20, marginTop: "30%" }}>Back To Home </Text>
          </TouchableOpacity>
        </ScrollView>

      </>
    )
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* green checkmark */}
      <View
        style={{
          margin: 15,
          alignItems: "center",
          height: "100%",
        }}
      >
        {totalUSD == 0 ? (
          <>
            <Text style={{ fontSize: 15, alignSelf: 'center', marginTop: "60%" }}>
              No Orders Have been Placed Yet.
            </Text>
            <LottieView
              style={{ height: 200, alignSelf: "center", marginBottom: 30 }}
              source={require("../assets/animations/noitem.json")}
              autoPlay
              speed={0.5}
              loop={false}
            />
          </>
        ) : (
          <Ord1 />
        )}

      </View>
    </SafeAreaView>
  );
}
