import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as Linking from "expo-linking";
import io from 'socket.io-client';

export default function App() {
	const [data, setData] = useState(null);

	const handleOpenURL = (event) => {
		let data = Linking.parse(event.url);
		console.log(data);
		setData(data);
	};

	const joinRoom = (room) => {
		const socket = io("192.168.1.61:5000");
		socket.emit("join", room);
	}

	useEffect(() => {

		(async () => {
			const initialURL = await Linking.getInitialURL();
			if (initialURL) {
				const room = Linking.parse(initialURL).queryParams.room
				setData(room);
				joinRoom(room);
			}
		})();

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
