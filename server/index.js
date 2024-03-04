const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03d5cbaeb6475fe9057e406e5623819250a78453dec25e6b3ffa18cbd50202dbbe" : 100,
  "02216fa327d59ece9e895270de2a0a0847a84c8f0fa488851d09e43e7d9f743c2d" : 50,
  "025d6dcafbe9ee6a1d2a2d662865e914fbbdf9ed1a7da5d4b154320b3cc1c7ea54" : 75
}
//public key, private key
const keys = {
  "03d5cbaeb6475fe9057e406e5623819250a78453dec25e6b3ffa18cbd50202dbbe" : "a2d656ad8a59a517134dcb374e2fcb0166da4b3d571d68556344db926639acf3",
  "02216fa327d59ece9e895270de2a0a0847a84c8f0fa488851d09e43e7d9f743c2d" : "ff308bf31943d0831cfa762df221bdcdd62bd700dc5944df1a6bc2ae151ddaf1",
  "025d6dcafbe9ee6a1d2a2d662865e914fbbdf9ed1a7da5d4b154320b3cc1c7ea54" : "c058f801801446c506745c35e903ebfc74eea5d1cf2c2fb7b564c2693dd4261d"
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
