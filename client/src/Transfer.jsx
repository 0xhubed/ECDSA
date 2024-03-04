import { useState } from "react";
import server from "./server";
import * as secp from "@noble/curves/secp256k1";

function Transfer({ address, setBalance, validSignature, setValidSignature}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function onChangeBalance(evt) {
    const setVal = evt.target.value;
    setSendAmount(setVal);
    RevertSignature();
  }

  async function onChangeRecipient(evt) {
    const setVal = evt.target.value;
    setRecipient(setVal);
    RevertSignature();
  }

  async function RevertSignature() {
    validSignature = false;
    setValidSignature(false);
  }


  async function transfer(evt) {
    evt.preventDefault();
    if(validSignature == false){
      window.confirm("Signature not valid!");
      return;
    }
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
      setValidSignature(false);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }
  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={onChangeBalance}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={onChangeRecipient}
        ></input>
      </label>
      <input type="submit" className="button" value="Transfer"/>
    </form>
  );
}
export default Transfer;
