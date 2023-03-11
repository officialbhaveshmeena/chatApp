const express = require("express");
const app = express();
const http = require("http");
var get_ip = require("ipware")().get_ip;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cors = require("cors");

app.use(cors());

const users = [];

let count = 1;
io.on("connection", (socket) => {
  console.log("User Connected: ", count);
  count++;

  socket.on("registeruser", (data) => {
    let user = data;
    user.friends = [];
    users.push(user);
    console.log("Register User: ", user);
  });
  socket.on("loginuser", (data) => {
    //fliter user based on email
    console.log("Authentication in progess...", data.email);
    try {
      let result = users.filter((user) => user.email == data.email);

      if (result) {
        console.log("loginuser: ", result[0].username);
        result[0].id = socket.id;
        socket.emit("authenticateuser", {
          name: result[0].username,
          email: result[0].email,
        });
      } else {
        console.log("invalid credientials");
        socket.emit("authenticateuser", 0);
      }
    } catch (e) {
      console.log("Error");
    }

    socket.emit("usersList", users);

    socket.on("addFriend", (data) => {
      // const { name, friendName, email, friendemail } = { data };
      const name = data.name;
      const email = data.email;
      const friendName = data.friendName;
      const friendemail = data.friendemail;
      console.log("Adding friend");
      console.log(`user: ${name} ,friend: ${friendName}`);
      // console.log("Name: ", name, ",Email: ", email);
      let result = users.filter((user) => user.email == email);
      // console.log("Result: ", result);
      if (
        result[0].friends.email !== friendemail &&
        result[0].email !== friendemail
      ) {
        result[0].friends.unshift({
          name: friendName,
          email: friendemail,
          messages: [],
        });
      }
      console.log(
        `Hello ${name} this person added to your friendList: ${friendName} `
      );
      //  console.log("Friend: ", friendName, ",Friend's Email: ", friendemail);

      let friend = users.filter((user) => user.email == friendemail);
      if (friend[0].friends.email !== email && friend[0].email !== email) {
        friend[0].friends.unshift({
          name: name,
          email: email,
          messages: [],
        });
      }
    });
    //socket.emit("newmessages", messages);
  });

  socket.on("messages", (data) => {
    const senderEmail = data.senderEmail;
    const friendEmail = data.friendEmail;
    const msg = data.chat;

    let friend = users.filter((user) => user.email == friendEmail);
    let user = users.filter((user) => user.email == senderEmail);
    console.log(
      "sender: ",
      senderEmail,
      " receiver: ",
      friendEmail,
      " msg: ",
      msg
    );

    if (friend[0] && user[0]) {
      let chats = friend[0].friends.filter((user) => user.email == senderEmail);
      chats[0].messages.push(data);

      io.to(friend[0].id).emit("chatmessages", chats[0].messages);
      console.log("Sending msgs: ", chats[0].messages);
      let userchats = user[0].friends.filter(
        (user) => user.email == friendEmail
      );
      userchats[0].messages.push(data);
      io.to(user[0].id).emit("chatmessages", userchats[0].messages);
    }
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("User Disconnected ");
    count--;
  });
});

app.get("/users", (req, res) => {
  console.log("Ip-address :", get_ip(req));
  res.json(users);
  console.log("All Users: ", users);
});
app.get("/:email/users", (req, res) => {
  let result = users.filter((user) => user.email == req.params.email);
  //result[0].friends;
  res.json(result[0].friends);
  console.log(
    "All Friends  of",
    result[0].username,
    " are: ",
    result[0].friends
  );
});
app.get("/:email/:femail/messages", (req, res) => {
  let user = users.filter((user) => user.email == req.params.email);
  let friend = user[0].friends.filter(
    (user) => user.email == req.params.femail
  );
  res.json(friend[0].messages);
});
server.listen(4000, () => {
  console.log("Server is running : 4000");
});
/*
socket.on("chat message", (msg) => {
        people.forEach((element) => {
          if (element.username == userdata.bff) {
            io.to([element.id]).emit(
              "chat message",
              `${userdata.username}:${msg}`
            );
            io.to([userdata.id]).emit(
              "chat message",
              `${userdata.username}:${msg}`
            );
          }
        });
*/
