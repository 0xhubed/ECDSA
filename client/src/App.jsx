import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Signature from "./Signature";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [validSignature, setValidSignature] = useState(Boolean);

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        validSignature={validSignature}
        setValidSignature={setValidSignature}
      />
      <Transfer setBalance={setBalance} address={address} validSignature={validSignature} setValidSignature={setValidSignature}/>
      <Signature address={address} balance={balance} privateKey={privateKey} setPrivateKey={setPrivateKey} validSignature={validSignature} setValidSignature={setValidSignature}/>
    </div>
  );
}

export default App;
