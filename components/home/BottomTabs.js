import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { auth } from "../../firebase";


export default function BottomTabs({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);



  const checkUser = () => {

    if (auth.currentUser) {
      navigation.navigate("UserProfile");
      console.log("usr prof :" + auth.currentUser.email)
    }
    else {
      navigation.navigate("Login");

    }
  }

  const DashNotAuth = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          marginHorizontal: 30,
          justifyContent: "space-between",
        }}
      >
        <Icon icon="home" text="Home" />
        {/* <Icon icon="search" text="Browse" navigate={() => setModalVisible(true)} />
        <Icon icon="shopping-bag" text="Cart" navigate={() => navigation.navigate("Cart")} />
        <Icon icon="receipt" text="Orders" navigate={() => navigation.navigate("Cart")} /> */}
        <Icon icon="shopping-bag" text="Cart" navigate={() => navigation.navigate("Cart")} />
        <Icon icon="user" text="Account" navigate={() => checkUser()} />
      </View>
    )
  }
  const DashAuth = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          marginHorizontal: 30,
          justifyContent: "space-between",
        }}
      >
        <Icon icon="home" text="Home" />
        {/* <Icon icon="search" text="Browse" navigate={() => setModalVisible(true)} />
    <Icon icon="shopping-bag" text="Cart" navigate={() => navigation.navigate("Cart")} />
    <Icon icon="receipt" text="Orders" navigate={() => navigation.navigate("Cart")} /> */}
        <Icon icon="receipt" text="Orders" navigate={() => navigation.navigate("Cart")} />
        <Icon icon="shopping-bag" text="Cart" navigate={() => navigation.navigate("Cart")} />
        <Icon icon="user" text="Account" navigate={() => checkUser()} />
      </View>
    )
  }




  return (
    <View>
      {auth.currentUser ? (


        <DashAuth />

      ) : (

        <DashNotAuth />

      )}

    </View>
  );
}

const Icon = (props) => {



  return (
    <>

      <TouchableOpacity
        onPress={props.navigate}
      >
        <View>
          <FontAwesome5
            name={props.icon}
            size={25}
            style={{
              marginBottom: 3,
              alignSelf: "center",
            }}
          />
          <Text>{props.text}</Text>

        </View>
      </TouchableOpacity>

    </>

  )
};


  // const SearchTab = () => {
  //   return (

  //     <Modal
  //       animationType="slide"
  //       visible={modalVisible}
  //       transparent={true}
  //       onRequestClose={() => setModalVisible(false)}
  //     />

  //   )
  // }

