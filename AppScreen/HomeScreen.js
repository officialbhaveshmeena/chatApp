import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  HStack,
  IconButton,
  VStack,
  ListItem,
  Button,
  Stack,
} from "@react-native-material/core";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FlatList } from "react-native";
import { Chat } from "../AppComponents/Chat";
import socket from "../AppUtils/socket";

const flist = [];
function HomeScreen({ route, navigation }) {
  const [name, setName] = useState(route.params.name);
  const [email, setEmail] = useState(route.params.email);
  const [data, setData] = useState([]);
  const [addPeopleStatus, setAddPeopleStatus] = useState(false);
  const [friends, setFriends] = useState([]);
  const addData = (val) => {
    let newdata = data.unshift(val);
    setData(newdata);
  };

  const [users, setUsers] = useState([]);

  const showUsers = (users) => {
    if (friends.length != 0) {
      let addUsers = [];
      friends.forEach((friend) => {
        users.forEach((user) => {
          if (friend.email !== user.email) {
            addUsers.push(user);
          }
        });
      });
      setUsers(addUsers);
    } else {
      setUsers(users);
    }
  };

  socket.on("connect");
  //runs when components mount
  useLayoutEffect(() => {
    async function fetchUser() {
      let res = await fetch("http://localhost:4000/users");
      let json = await res.json();
      json = json.filter((user) => user.email != email);
      //setUsers(json);
      showUsers(json);
    }
    fetchUser();
  }, []);
  //👇🏻 Runs whenever there is new trigger from the backend
  useEffect(() => {
    socket.on("usersList", (users) => {
      let json = json.filter((user) => user.email != email);
      //setUsers(json);
      showUsers(json);
    });
  }, [socket]);
  //addPeopleStatus Update
  useEffect(() => {
    async function fetchUser() {
      let res = await fetch("http://localhost:4000/users");
      let json = await res.json();
      json = json.filter((user) => user.email != email);
      //setUsers(json);
      showUsers(json);
    }
    async function fetchUser2() {
      let res = await fetch(`http://localhost:4000/${email}/users`);
      let json = await res.json();
      // json = json.filter((user) => user.email != email);

      setFriends(json);
    }
    fetchUser();
    fetchUser2();
  }, [addPeopleStatus]);

  useLayoutEffect(() => {
    async function fetchUser() {
      // alert("layout effect");
      let res = await fetch(`http://localhost:4000/${email}/users`);
      let json = await res.json();
      // json = json.filter((user) => user.email != email);
      setFriends(json);
    }
    fetchUser();
  }, []);
  // useEffect(() => {
  //   async function fetchUser() {
  //     let res = await fetch(`http://localhost:4000/${email}/users`);
  //     let json = await res.json();
  //     // json = json.filter((user) => user.email != email);
  //     setFriends(json);
  //   }
  //   fetchUser();
  // }, [addPeopleStatus]);
  const addFriend = (friend) => {
    //alert(friend.name);
    socket.emit("addFriend", {
      name: name,
      email: email,
      friendName: friend.name,
      friendemail: friend.email,
    });
    //setAddPeopleStatus(!addPeopleStatus);
  };

  return (
    <Stack fill>
      <AppBar
        title={name}
        color="blue"
        //transparent
        tintColor="black"
        leading={(props) => (
          <Avatar
            image={{
              uri: "https://images.freeimages.com/images/large-previews/d41/bear-combat-2-1332988.jpg",
            }}
            onPress={() => {
              alert("phtoto");
            }}
          />
        )}
        trailing={(props) => (
          <HStack>
            <IconButton
              icon={(props) => <Icon name="magnify" {...props} />}
              onPress={() => {
                //  <BannerScreen />;
                //alert("search");
              }}
            />
            <IconButton
              icon={(props) => (
                <Icon
                  name={addPeopleStatus ? "account-multiple-outline" : "plus"}
                  {...props}
                />
              )}
              onPress={() => {
                //  <BannerScreen />;
                setAddPeopleStatus(!addPeopleStatus);
                //alert("search");
              }}
            />
            <IconButton
              icon={(props) => <Icon name="menu" {...props} />}
              onPress={() => {
                //  <BannerScreen />;
                alert("search");
              }}
            />
          </HStack>
        )}
      />

      {addPeopleStatus ? (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <ListItem
              leadingMode="Avatar"
              leading={
                <Avatar
                  image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }}
                />
              }
              title={item.username}
              secondaryText="He is software developer."
              // onPress={() => {
              //   alert("profile:");
              // }}
              trailing={
                <IconButton
                  icon={(props) => <Icon name="plus" {...props} />}
                  onPress={() => {
                    //  <BannerScreen />;
                    let fname = item.username;
                    let femail = item.email;
                    //flist.unshift({ name: fname });
                    //peopleData.shift();
                    addFriend({ name: fname, email: femail });
                  }}
                  style={{
                    backgroundColor: "lightgreen",
                  }}
                />
              }
            />
          )}
        />
      ) : (
        <FlatList
          data={friends}
          renderItem={({ item }) => (
            <ListItem
              leadingMode="Avatar"
              leading={
                <Avatar
                  image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }}
                />
              }
              title={item.name}
              secondaryText="He is software developer."
              onPress={() =>
                navigation.navigate("chat", {
                  friend: item.name,
                  femail: item.email,
                  user: name,
                  email: email,
                })
              }
            />
          )}
        />
      )}
    </Stack>
  );
}

export default HomeScreen;
