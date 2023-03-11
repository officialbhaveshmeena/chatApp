import SocketIOClient from "socket.io-client";
const socket = SocketIOClient("http://192.168.190.35:4000", {
  transports: ["websocket"],
});
export default socket;
