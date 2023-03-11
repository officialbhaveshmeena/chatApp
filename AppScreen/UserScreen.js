import { Button, Stack, Text, TextInput } from "@react-native-material/core";
import React, { useState } from "react";
// import { Text, View } from "react-native";

function UserScreen(props) {
  const [friend, setFriend] = useState("");
  const handleFriend = (data) => {
    alert("Friend is: ", data.name);
  };
  return (
    <Stack fill justify="center" items="center" m={4} spacing={12}>
      <Text
        variant="h5"
        style={{
          alignSelf: "center",
        }}
      >
        {" "}
        Add a friend
      </Text>

      <TextInput
        value={friend}
        onChangeText={(val) => {
          setFriend(val);
        }}
        style={{
          width: "50%",
        }}
      />
      <Button
        title="add"
        onPress={() => handleFriend({ name: friend })}
        style={{
          width: "50%",
        }}
      />
    </Stack>
  );
}

export default UserScreen;
