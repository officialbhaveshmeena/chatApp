import {
  IconButton,
  Stack,
  TextInput,
  Button,
  Surface,
} from "@react-native-material/core";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import socket from "../AppUtils/socket";

function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const userInfo = (data) => {
  //     const { name, email, password } = { ...data };
  //     alert(`Welcome ${name}`);
  //   };
  // async function registerUser() {
  //   if (email !== "" && password !== "" && name !== "") {
  //     const userdata = {
  //       username: name,
  //       email: email,
  //       password: password,
  //     };
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userdata),
  //     };
  //     const response = await fetch(
  //       "http://localhost:4500/user/register",
  //       options
  //     );
  //     const json = await response.json();
  //     let arr = new Array(json);
  //     //setData(arr);
  //     alert(arr[0].user.name);
  //   } else {
  //     //return 0;
  //     alert("Provide details");
  //   }
  // }
  const registerUser = () => {
    if (email !== "" && password !== "" && name !== "") {
      const userdata = {
        username: name,
        email: email,
        password: password,
      };
      // socket.emit("messages", { msg: name, email: email });

      socket.emit("registeruser", userdata);
      navigation.navigate("login");
      alert("Register User: ", name);
    } else {
      alert("Provide details");
    }
  };
  return (
    <Stack
      spacing={2}
      style={{ flex: 1, justifyContent: "center", margin: 16 }}
    >
      <TextInput
        label="Enter your Name"
        leading={(props) => <Icon name="account" {...props} />}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        label="Enter your Email"
        leading={(props) => <Icon name="email" {...props} />}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Enter Your Password"
        leading={(props) => <Icon name="lock" {...props} />}
        //value={name}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Surface
        elevation={10}
        category="medium"
        style={{
          //height: "20%",
          width: "20%",
          height: 35,
          alignSelf: "center",
          margin: 10,
        }}
      >
        <Button
          title="signup"
          onPress={() => registerUser()}
          style={{
            backgroundColor: "blue",
            width: "100%",
            height: "100%",
            alignSelf: "center",
            borderRadius: "30px",
            border: "1.5px solid blue",
          }}
        />
      </Surface>
      <Surface
        elevation={10}
        category="medium"
        style={{
          //height: "20%",
          width: "50%",
          height: 35,
          alignSelf: "center",
          margin: 10,
        }}
      >
        <Button
          title="login to account !"
          onPress={() => navigation.navigate("login")}
          style={{
            backgroundColor: "blue",
            width: "100%",
            height: "100%",
            alignSelf: "center",
            borderRadius: "30px",
            border: "1.5px solid blue",
          }}
        />
      </Surface>
    </Stack>
  );
}

export default Signup;
