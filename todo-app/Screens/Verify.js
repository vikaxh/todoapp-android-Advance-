import { View, Text, StyleSheet } from 'react-native'
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { loadUser, verify } from '../redux/action';
import { useEffect } from 'react';


const Verify = () => {
  
    const [otp, setOtp] = useState();

    const dispatch = useDispatch()
      const { message, error } = useSelector((state) => state.message);


    const verifyHandler = async () => {
        await dispatch(verify(otp));
        dispatch(loadUser())
    }
     useEffect(() => {
       if (error) {
         alert(error);
         dispatch({ type: "clearError" });
       }
       if (message) {
         alert(message);
         dispatch({ type: "clearMessage" });
       }
     }, [alert, error, message, dispatch]);
    
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, margin: 20 }}>Verification</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={Styles.input}
          placeholder="OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
        />
      </View>

      <Button style={Styles.btn} color="#fff" onPress={verifyHandler}>
        Verify
      </Button>
    </View>
  );
}

export default Verify


const Styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },

  btn: {
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
  },
});