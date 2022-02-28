import React from 'react'

import Login from './Login'
import Register from './Register'
import UserProfile from './UserProfile'

export default function UserScreens({ navigation }) {
    return (
        <>
            <UserProfile navigation={navigation} />
            <Login navigation={navigation} />
            <Register navigation={navigation} />
        </>
    )
}
