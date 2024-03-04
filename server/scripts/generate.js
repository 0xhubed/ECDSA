const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { secp256k1 } = require("@noble/curves/secp256k1");
const { toHex }= require("ethereum-cryptography/utils");
const { hexToBytes }= require("ethereum-cryptography/utils");
const priv = secp256k1.utils.randomPrivateKey();
function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    return keccak256(bytes);
}

const privateKey = secp256k1.utils.randomPrivateKey();
const privateKeyHex = toHex(privateKey);
console.log("PrivateKey =",privateKey);
console.log("HexPrivateKey =", privateKeyHex);
const pub = secp256k1.getPublicKey(privateKeyHex);
console.log("PublicKey=", pub);
console.log("HexPublicKey =", toHex(pub));


const msg = "Test";
const hashedMessage = hashMessage(msg);
const signature = secp256k1.sign(hashedMessage, privateKey); // `{prehash: true}
console.log("Valid signature", secp256k1.verify(signature, hashedMessage, pub));
const recoveredPublicKey = signature.recoverPublicKey(hashedMessage).toRawBytes();
console.log("RecPublicKey =", recoveredPublicKey);
console.log("HexRecPublicKey =", toHex(recoveredPublicKey));
const privateKey2 = secp256k1.utils.randomPrivateKey();
const privateKeyHex2 = toHex(privateKey2);
const pub2 = secp256k1.getPublicKey(privateKeyHex2);
//console.log("HexSignature", toHex(signature));
console.log("Valid signature", secp256k1.verify(signature, hashedMessage, pub2));