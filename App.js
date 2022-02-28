import * as React from "react";
import RootNavigation from "./navigation";

export default function App() {

  return <RootNavigation />;
}
// components/dashboard.js


// import React, { Component } from 'react';
// import { StyleSheet, View, Text, Button } from 'react-native';
// import firebase from './firebase';
// import { getAuth, signOut } from 'firebase/auth';
 

// export default class Dashboard extends Component {
//     constructor() {
//         super();
//         this.state = {
//             uid: ''
//         }
//     }

//     signOut = () => {
//         const auth = getAuth()
//         auth.signOut().then(() => {
//             this.props.navigation.navigate('Login')
//         })
//             .catch(error => this.setState({ errorMessage: error.message }))
//     }


//     render() {
//         const auth = getAuth()
//         this.state = {
//             displayName: auth.currentUser.displayName,
//             uid: auth.currentUser.uid
//         }
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.textStyle}>
//                     Hello, {this.state.email}
//                 </Text>

//                 <Button
//                     color="#3740FE"
//                     title="Logout"
//                     onPress={() => this.signOut()}
//                 />
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         display: "flex",
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 35,
//         backgroundColor: '#fff'
//     },
//     textStyle: {
//         fontSize: 20,
//         marginBottom: 20
//     }
// });


// components/login.js

// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import React, { Component } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
// import * as firebase from './firebase';


// export default class Login extends Component {

//     constructor() {
//         super();
//         this.state = {
//             email: '',
//             password: '',
//             isLoading: false
//         }
//     }

//     updateInputVal = (val, prop) => {
//         const state = this.state;
//         state[prop] = val;
//         this.setState(state);
//     }

//     userLogin = () => {
//         if (this.state.email === '' && this.state.password === '') {
//             Alert.alert('Enter details to signin!')
//         } else {
//             this.setState({
//                 isLoading: true,
//             })
//             const auth = getAuth();

//             signInWithEmailAndPassword(auth, this.state.email, this.state.password)
//                 .then((res) => {
//                     console.log(res)
//                     Alert.alert(`${this.state.email}` + ' logged-in successfully!')
//                     this.setState({
//                         isLoading: false,
//                         email: this.state.email,
//                         password: ''
//                     })
//                     this.props.navigation.navigate('Dashboard')
//                 })
//                 .catch(error => Alert.alert(error))
//         }
//     }

//     render() {
//         if (this.state.isLoading) {
//             return (
//                 <View style={styles.preloader}>
//                     <ActivityIndicator size="large" color="#9E9E9E" />
//                 </View>
//             )
//         }
//         return (
//             <View style={styles.container}>
//                 <TextInput
//                     style={styles.inputStyle}
//                     placeholder="Email"
//                     value={this.state.email}
//                     onChangeText={(val) => this.updateInputVal(val, 'email')}
//                 />
//                 <TextInput
//                     style={styles.inputStyle}
//                     placeholder="Password"
//                     value={this.state.password}
//                     onChangeText={(val) => this.updateInputVal(val, 'password')}
//                     maxLength={15}
//                     secureTextEntry={true}
//                 />
//                 <Button
//                     color="#3740FE"
//                     title="Signin"
//                     onPress={() => this.userLogin()}
//                 />

//                 <Text
//                     style={styles.loginText}
//                     onPress={() => this.props.navigation.navigate('Signup')}>
//                     Don't have account? Click here to signup
//                 </Text>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         padding: 35,
//         backgroundColor: '#fff'
//     },
//     inputStyle: {
//         width: '100%',
//         marginBottom: 15,
//         paddingBottom: 15,
//         alignSelf: "center",
//         borderColor: "#ccc",
//         borderBottomWidth: 1
//     },
//     loginText: {
//         color: '#3740FE',
//         marginTop: 25,
//         textAlign: 'center',
//         fontSize: 20
//     },
//     preloader: {
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         position: 'absolute',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff'
//     }
// });
// components/signup.js

// import React, { Component } from 'react';
// import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
// import * as firebase from './firebase';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

// //const auth = getAuth();
// export default class Signup extends Component {


//     constructor() {
//         super();
//         this.state = {
//             displayName: '',
//             email: '',
//             password: '',
//             isLoading: false
//         }
//     }

//     updateInputVal = (val, prop) => {
//         const state = this.state;
//         state[prop] = val;
//         this.setState(state);
//     }

//     registerUser = () => {
//         if (this.state.email === '' && this.state.password === '') {
//             Alert.alert('Enter details to signup!')
//         } else {

//             this.setState({
//                 isLoading: true,
//             })
//             const auth = getAuth();

//             createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
//                 .then((res) => {
//                     // res.user.updateProfile({
//                     //     displayName: this.state.displayName
//                     // })
//                     Alert.alert('Sign-Up success! Please now Login.')
//                     // this.setState({
//                     //     isLoading: false,
//                     //     displayName: '',
//                     //     email: '',
//                     //     password: ''
//                     // })
//                     this.props.navigation.navigate('Login')
//                 })
//                 .catch(error => this.setState({ errorMessage: error.message }))
//         }
//     }

//     render() {
//         if (this.state.isLoading) {
//             return (
//                 <View style={styles.preloader}>
//                     <ActivityIndicator size="large" color="#9E9E9E" />
//                 </View>
//             )
//         }
//         return (
//             <View style={styles.container}>
//                 <TextInput
//                     style={styles.inputStyle}
//                     placeholder="Name"
//                     value={this.state.displayName}
//                     onChangeText={(val) => this.updateInputVal(val, 'displayName')}
//                 />
//                 <TextInput
//                     style={styles.inputStyle}
//                     placeholder="Email"
//                     value={this.state.email}
//                     onChangeText={(val) => this.updateInputVal(val, 'email')}
//                 />
//                 <TextInput
//                     style={styles.inputStyle}
//                     placeholder="Password"
//                     value={this.state.password}
//                     onChangeText={(val) => this.updateInputVal(val, 'password')}
//                     maxLength={15}
//                     secureTextEntry={true}
//                 />
//                 <Button
//                     color="#3740FE"
//                     title="Signup"
//                     onPress={() => this.registerUser()}
//                 />

//                 <Text
//                     style={styles.loginText}
//                     onPress={() => this.props.navigation.navigate('Login')}>
//                     Already Registered? Click here to login
//                 </Text>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         padding: 35,
//         backgroundColor: '#fff'
//     },
//     inputStyle: {
//         width: '100%',
//         marginBottom: 15,
//         paddingBottom: 15,
//         alignSelf: "center",
//         borderColor: "#ccc",
//         borderBottomWidth: 1
//     },
//     loginText: {
//         color: '#3740FE',
//         marginTop: 25,
//         textAlign: 'center',
//         fontSize: 20
//     },
//     preloader: {
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//         position: 'absolute',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff'
//     }
// });