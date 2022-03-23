import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as Linking from "expo-linking";

export default function App() {
  const [data, setData] = useState(null);

  const handleOpenURL = (event) => {
    let data = Linking.parse(event.url);
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    const getInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) setData(Linking.parse(initialURL));
    };

    if (!data) {
      getInitialURL();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>{data ? JSON.stringify(data) : "App not opened from link"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
