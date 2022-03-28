import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as Linking from "expo-linking";
import io from "socket.io-client";

const IP = "192.168.0.134:5000";
const socket = io(`http://${IP}`);

export default function App() {
  const [room, setRoom] = useState();
  const joinRoom = (room) => {
    setRoom(room);
    socket.emit("join", { room, type: "mobile" });
  };

  useEffect(() => {
    (async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        const room = Linking.parse(initialURL).queryParams.room;
        joinRoom(room);
      }
    })();

    socket.on("error", alert);
    socket.on("web-disconnected", () => {
      alert("web disconnected");
    });

    return () => {
      socket.off("error");
      socket.off("web-disconnected");
      socket.emit("leave", room);
    };
  }, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
