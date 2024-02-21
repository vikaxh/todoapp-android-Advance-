import Home from "./Screens/Home"
import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Login from "./Screens/Login"
import Footer from "./Component/Footer"
import Profile from "./Screens/Profile"
import Register from "./Screens/Register"
import CameraComponent from "./Screens/Camera"
import {useSelector, useDispatch} from "react-redux"
import { useEffect } from "react";
import { loadUser } from "./redux/action"
import Loader from "./Component/Loader"
import ChangePassword from "./Screens/ChangePassword"
import Verify from "./Screens/Verify"
import ForgetPassword from "./Screens/ForgetPassword"
import ResetPassword from "./Screens/ResetPassword"

const Stack = createNativeStackNavigator()
const Main = () => {
   const dispatch = useDispatch();

   
   useEffect(() => {
     dispatch(loadUser());
   }, [dispatch]);

  const {isAuthenticated, loading} = useSelector(state => state.auth)
  return loading ? (
    <Loader />
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "home" : "login"}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="camera"
          component={CameraComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="changepassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="verify"
          component={Verify}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forgetpassword"
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="resetpassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {isAuthenticated && <Footer />}
    </NavigationContainer>
  );
}

export default Main