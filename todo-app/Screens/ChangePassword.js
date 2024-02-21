import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper';
import { useState } from 'react';
import {useDispatch} from "react-redux"
import { updatePassword } from '../redux/action';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("");

    const dispatch = useDispatch()

    const changePasswordHandler = () => {
        dispatch(updatePassword(oldPassword, newPassword))
    }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, margin: 20 }}>Change Password</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          secureTextEntry
          style={Styles.input}
          placeholder="Old Password"
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        <TextInput
          secureTextEntry
          style={Styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>
      <Button style={Styles.btn} onPress={changePasswordHandler} color="#fff">
        Change
      </Button>
    </View>
  );
}

export default ChangePassword


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
