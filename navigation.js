import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import OrderCompleted from "./screens/OrderCompleted";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ViewCart from "./components/restaurantDetail/ViewCart";
import UserProfile from "./screens/UserProfile";
import Cart from "./screens/Cart";
import MenuItems from "./components/restaurantDetail/MenuItems";
import UserScreens from "./screens/UserScreens";

const store = configureStore();

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };


  return (


    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="ViewCart" component={ViewCart} />
          <Stack.Screen name="UserScreens" component={UserScreens} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="MenuItems" component={MenuItems} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
          <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>




  );
}
