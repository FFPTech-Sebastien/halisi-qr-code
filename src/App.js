import "./App.css";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";

// const IP = "192.168.1.61:19000";
// const IP = "ma-q28.ffptech-expo.mobile-app.exp.direct:80"
// const IP = "exp.host/@ffptech-expo/expo-face-detector";
const IP = "192.168.0.134";

const socket = io(`${IP}:5000`);

function App() {
  const [value, setValue] = useState("");
  const [globalId, setGlobalId] = useState(null);
  const [isMobileAppConnected, setMobileAppConnected] = useState(false);

  const generateQRCode = () => {
    if (globalId) {
      socket.emit("leave", globalId);
    }
    setMobileAppConnected(false);
    const id = uuidv4();
    setGlobalId(id);
    setValue(`exp://${IP}:19000?room=${id}`);
    socket.emit("join", { room: id, type: "web" });
  };

  useEffect(() => {
    socket.on("mobile-connected", () => {
      console.log("mobile connected");
      setMobileAppConnected(true);
    });

    return () => {
      socket.emit("leave", globalId);
    };
  }, []);

  return (
    <div className="App">
      {value && <QRCode value={value} />}

      <button onClick={generateQRCode}>Generate new QrCode</button>
      {isMobileAppConnected && (
        <div>
          <b>Mobile app connected</b>
        </div>
      )}
    </div>
  );
}

export default App;
