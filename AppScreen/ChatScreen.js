import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import socket from "../AppUtils/socket";
import MessageScreen from "./MessageScreen";

function ChatScreen({ route }) {
  let user = route.params.user;
  let email = route.params.email;
  let fname = route.params.friend;
  let femail = route.params.femail;
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);

  const handleMessage = () => {
    // alert(text);
    let t = new Date();
    let h = t.getHours() > 12 ? t.getHours() - 12 : t.getHours();
    h = h < 10 ? `0${h}` : h;
    let m = t.getMinutes();
    m = m < 10 ? `0${m}` : m;
    let meridiem = t.getHours() > 11 ? "PM" : "AM";
    let msg = {
      senderEmail: email,
      friendEmail: femail,
      chat: text,
      time: h + ":" + m + " " + meridiem,
    };
    // alert(msg.chat);
    socket.emit("messages", msg);
  };

  useLayoutEffect(() => {
    async function fetchMessages() {
      let res = await fetch(
        `http://localhost:4000/${email}/${femail}/messages`
      );
      let json = await res.json();
      //json = json.filter((user) => user.email != email);
      //setUsers(json);
      setMessage(json);
    }
    fetchMessages();
  }, []);

  // useEffect(() => {
  //   async function fetchMessages() {
  //     let res = await fetch(
  //       `http://localhost:4000/${email}/${femail}/messages`
  //     );
  //     let json = await res.json();
  //     //json = json.filter((user) => user.email != email);
  //     //setUsers(json);
  //     setMessage(json);
  //   }
  //   fetchMessages;
  // }, []);
  useEffect(() => {
    socket.on("chatmessages", (msg) => {
      setMessage(msg);
      // alert(message[0].chat);
    });
  }, [socket]);

  return (
    <View style={styles.view}>
      {/* // <View
      //   style={{
      //     flex: 0.9,
      //     // justifyContent: "flex-start",
      //     width: "100%",
      //   height: "90%",
      //     border: "1px solid",
      //     marginBottom: 5,
      //    // backgroundColor:"black"
      //     //alignItems: "flex-start",
      //     // backgroundColor: "green",
      //   }} */}
      {/* // >
      //<ImageBackground source={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} style={styles.image}   > */}

      <View style={styles.msgs}>
        {message.length != 0 ? (
          <FlatList
            data={message}
            renderItem={({ item }) => (
              <View
                style={
                  item.senderEmail !== email
                    ? styles.MessageWrapperLeft
                    : styles.MessageWrapperRight
                }
              >
                <View
                  style={item.senderEmail !== email ? styles.v1 : styles.v2}
                >
                  <Text style={styles.Message}>{item.chat}</Text>
                  <View
                    style={{
                      alignSelf: "flex-end",
                    }}
                  >
                    <Text style={{ fontSize: 8, color: "white", opacity: 0.5 }}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          "no chats"
        )}
      </View>

      <View
        style={{
          flex: 0.1,
          justifyContent: "flex-end",
        }}
      >
        <TextInput
          value={text}
          onChangeText={(val) => {
            setText(val);
          }}
          style={{
            border: "2px solid",
            height: 40,
          }}
        />
        <Button
          title="Send"
          style={{
            color: "blue",
            border: "2px solid",
            //alignSelf: "flex-end",
            width: "50%",
            //alignSelf: "center",
            bottom: 0,
          }}
          onPress={() => {
            handleMessage();
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  msgs: {
    flex: 0.9,
    border: "1px solid",
    marginBottom: 5,
  },
  view: {
    flex: 1,
  },
  image: {
    flex: 0.9,
    width: "100%",
    height: "100%",
    marginBottom: 5,
  },
  MessageWrapperLeft: {
    flex: 1,
    // justifyContent:""
    alignItems: "flex-start",
    //borderRadius: "2px",
  },
  v1: {
    maxWidth: "50%",
    backgroundColor: "grey",
    border: "1px solid",
    padding: 5,
    //borderRadius: 10,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginBottom: 2,
    marginLeft: 2,
  },
  MessageWrapperRight: {
    flex: 1,
    // justifyContent:""
    alignItems: "flex-end",
    //borderRadius: "2px",
  },
  v2: {
    maxWidth: "50%",
    backgroundColor: "green",
    border: "1px solid",
    padding: 5,
    // borderRadius: 5,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 2,
    marginRight: 2,
  },
  Message: {
    fontSize: 13,
    color: "white",
  },
});
export default ChatScreen;
