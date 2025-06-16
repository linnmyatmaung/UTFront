import { io } from "socket.io-client";

const socket = io("https://utback.onrender.com", {
  withCredentials: true,
});

export default socket;
