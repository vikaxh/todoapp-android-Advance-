import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import { Dialog, Button, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../Component/Task";
import { addTask, loadUser } from "../redux/action";
import { useEffect } from "react";
import Loader from "../Component/Loader";
import Verify from "./Verify";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.message);
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {user} = useSelector(state => state.auth)

  const hideDialog = () => {
    setOpenDialog(!openDialog);
  };

  const addTaskHandler = async () => {
    await dispatch(addTask(title, description));
    dispatch(loadUser())
  };

    useEffect(() => {
      if (error) {
        alert(error);
        dispatch({ type: "clearError" });
        dispatch({ type: "clearError" });
      }
      if (message) {
        alert(message);
        dispatch({ type: "clearMessage" });
      }
    }, [alert, error, message, dispatch]);

  return loading ? (
    <Loader />
  ) : user.verified ?(
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView>
        <SafeAreaView>
          <Text style={styles.heading}>All Tasks</Text>

          {user &&
            user.tasks.map((item) => (
              <Task
                key={item._id}
                title={item.title}
                description={item.description}
                status={item.completed}
                taskId={item._id}
              />
            ))}

          <TouchableOpacity style={styles.addBtn} onPress={hideDialog}>
            <Icon name="add-to-list" size={20} color="#900" />
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>

      <Dialog visible={openDialog} onDismiss={hideDialog}>
        <Dialog.Title>ADD A TASK</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={hideDialog}>
              <Text>CANCEL</Text>
            </TouchableOpacity>
            <Button
              color="#900"
              disabled={!title || !description || loading}
              onPress={addTaskHandler}
            >
              ADD
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </View>
  ) : <Verify />
};

export default Home;

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 20,
    color: "#fff",
    backgroundColor: "#474747",
  },
  addBtn: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
    elevation: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
});
