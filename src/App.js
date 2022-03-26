import "./App.css";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import io from "socket.io-client";

// const IP = "192.168.1.61:19000";
// const IP = "ma-q28.ffptech-expo.mobile-app.exp.direct:80"

function App() {
	const [value, setValue] = useState("");
	const [isMobileAppConnected, setMobileAppConnected] = useState(false);

	const generateQRCode = () => {
		const id = uuidv4();
		setValue(`exp://exp.host/@ffptech-expo/expo-face-detector?room=${id}`);
	}

	useEffect(() => {
		const socket = io("192.168.1.61:5000");
		socket.on("connected", () => {
			setMobileAppConnected(true);
		});
	}, []);

	return (
		<div className="App">
			{value &&
				<QRCode
					value={value}
				/>}

			<button onClick={generateQRCode}>Generate new QrCode</button>
			{
				isMobileAppConnected && (
					<div>
						<b>Mobile app connected</b>
					</div>
				)
			}
		</div>
	);
}

export default App;
