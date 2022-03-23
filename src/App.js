import "./App.css";
import QRCode from "react-qr-code";

function App() {
  return (
    <div className="App">
      <QRCode
        value={`exp://192.168.0.134:19000?room=rea541r68aze6r248r4ezr#çrea!rerazer4`}
      />
    </div>
  );
}

export default App;
