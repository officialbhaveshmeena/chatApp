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

//Surface
function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // async function loginUser() {
  //   if (email !== "" && password !== "") {
  //     const userdata = {
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
  //     const response = await fetch("http://localhost:4500/user/login", options);
  //     const json = await response.json();
  //     let arr = new Array(json);
  //     //setData(arr);
  //     alert(arr[0].msg);
  //     navigation.navigate("welcome");
  //   } else {
  //     //return 0;
  //     alert("Provide details");
  //   }
  // }
  const loginUser = () => {
    if (email !== "" && password !== "") {
      const userdata = {
        email: email,
        password: password,
      };

      socket.emit("loginuser", userdata);

      socket.on("authenticateuser", (data) => {
        if (data) {
          alert("User LoggedIn ...");
          navigation.navigate("home", {
            name: data.name,
            email: data.email,
          });
        } else {
          alert("invalid credientials");
        }
      });
    } else {
      alert("Provide details");
    }
  };
  return (
    <Stack
      spacing={2}
      style={{ flex: 1, justifyContent: "center", margin: 10 }}
    >
      <TextInput
        //variant="fill"
        label="Enter your Email"
        leading={(props) => <Icon name="email" {...props} />}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        //variant="fill"
        label="Enter Your Password"
        leading={(props) => <Icon name="lock" {...props} />}
        //value={name}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />

      <Surface
        elevation={15}
        category="medium"
        style={{
          //height: "20%",
          width: "50%%",
          height: 35,
          alignSelf: "center",
          margin: 10,
        }}
      >
        <Button
          variant="filled"
          title="Login"
          color="white"
          onPress={() => loginUser()}
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
        elevation={15}
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
          variant="filled"
          title="create an account!"
          color="white"
          onPress={() => navigation.navigate("register")}
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

export default Login;
