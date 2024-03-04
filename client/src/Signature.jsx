import { useState } from "react";
import  { secp256k1 } from "@noble/curves/secp256k1";
import  {  keccak256 } from "ethereum-cryptography/keccak";
import  {  utf8ToBytes } from "ethereum-cryptography/utils";
import server from "./server";

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  return keccak256(bytes);
}

function Signature({ address, balance, privateKey, setPrivateKey, validSignature, setValidSignature}) {
  const setValue = (setter) => (evt) => setter(evt.target.value);
  
  async function onChangePrivateKey(evt) {
    const privateKeyTmp = evt.target.value;
    setPrivateKey(privateKeyTmp);
    privateKey = privateKeyTmp;
  }

  async function sign(evt) {
    evt.preventDefault();
    try {
      const hashedMessage = hashMessage(String(balance));
      const signature = secp256k1.sign(hashedMessage, privateKey); // `{prehash: true}
      const verify = secp256k1.verify(signature, hashedMessage, address);
      setValidSignature(verify);
      validSignature = verify;
      setPrivateKey("");
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }
  return (
    <form className="container transfer" onSubmit={sign}>
      <h1>Sign Transaction</h1>
      <label>
        Valid Signature
        <input
          placeholder="Type an address, for example: 0x2"
          value={validSignature}
          onChange={setValue(validSignature)}
        ></input>
      </label>
      <label>
        Private Key for Signature
        <input placeholder="Type in privateKey" value={privateKey} onChange={onChangePrivateKey}></input>
      </label>
      <input type="submit" className="button" value="Sign" />
    </form>
  );
}
export default Signature;
