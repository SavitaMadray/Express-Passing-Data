const express = require("express");
const axios = require("axios");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("this works");
});

app.get("/image/", async (req, res) => {
  let search = req.query.q;
  console.log(req.query);
  let url = `https://pixabay.com/api/?key=5696431-75c30ffe4ffe5adb6734cc8f2&q=${search}`;
  try {
    let response = await axios.get(url);
    console.log(url);
    res.send(response.data);
  } catch (err) {
    console.log(err);
    res.json({ message: "Error" });
  }
});

app.get("/gifs/", async (req, res) => {
  let search = req.query.q;
  let limit = req.query.limit;
  let url = `http://api.giphy.com/v1/gifs/search?api_key=CrMmJIEgitX1ER3uLXUprAP7OwXbho3o&q=${search}`;
  try {
    let response = await axios.get(url);
    let gifs = response.data.data;
    let arrUrls = [];
    for (let i = 0; i < gifs.length; i++) {
      arrUrls.push(gifs[i].images.original.url);
    }
    // console.log(arrUrls);
    // console.log(response.data.data[0].images.original.url);
    res.json({
      payload: arrUrls,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "Error" });
  }
});

app.listen(port, () => {
  `Server on ${port}`;
});
