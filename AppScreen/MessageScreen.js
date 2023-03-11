import React from "react";
import { View, Text, StyleSheet } from "react-native";

function MessageScreen({ item, userEmail }) {
  const status = item.senderEmail !== userEmail;
  alert(item.chat);
  return (
    <View
      style={status ? styles.MessageWrapperRight : styles.MessageWrapperLeft}
    >
      <Text>{item.chat}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  MessageWrapperLeft: {
    //flex: 1,
    // justifyContent:""
    alignItems: "flex-start",
    borderRadius: "2px",
  },
  MessageWrapperRight: {
    //flex: 1,
    // justifyContent:""
    alignItems: "flex-end",
    borderRadius: "2px",
  },
  Message: {},
});
export default MessageScreen;
