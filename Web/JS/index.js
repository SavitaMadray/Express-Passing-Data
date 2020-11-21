document.addEventListener("DOMContentLoaded", () => {
  getImg();
  getGify();
});

const getImg = () => {
  let picBtn = document.querySelector("#image");
  picBtn.addEventListener("click", () => {
    loadImg();
  });
};

const getGify = () => {
  let gifBtn = document.querySelector("#gif");
  gifBtn.addEventListener("click", () => {
    loadGif();
  });
};

const loadImg = async () => {
  const search = document.querySelector("#search");
  let searchVal = search.value;
  let url = `http://localhost:3000/image/?q=${searchVal}`;
  try {
    let response = await axios.get(url);
    let data = response.data;
    showImg(data.hits);
  } catch (err) {
    console.log(err);
  }
};

const showImg = (data) => {
  let display = document.querySelector("#display");
  let prevDiv = document.querySelector("#imgDiv");
  if (prevDiv) {
    display.removeChild(prevDiv);
  }
  let imgDiv = document.createElement("div");
  imgDiv.id = "imgDiv";
  for (let i = 0; i < data.length; i++) {
    let img = document.createElement("img");
    img.src = data[i].userImageURL;
    imgDiv.appendChild(img);
  }
  display.appendChild(imgDiv);
};

const loadGif = async () => {
  const search = document.querySelector("#search");
  let searchVal = search.value;
  const limit = document.querySelector("#limit");
  let limitVal = limit.value;
  let url = `http://localhost:3000/gifs/?q=${searchVal}`;
  try {
    let response = await axios.get(url);
    let data = response.data;
    console.log(data);
    showGif(data.payload);
  } catch (err) {
    console.log(err);
  }
};

const showGif = (data) => {
  let display = document.querySelector("#display");
  let prevDiv = document.querySelector("#imgDiv");
  if (prevDiv) {
    display.removeChild(prevDiv);
  }
  let imgDiv = document.createElement("div");
  imgDiv.id = "imgDiv";
  for (let i = 0; i < data.length; i++) {
    let img = document.createElement("img");
    img.src = data[i];
    imgDiv.appendChild(img);
  }
  display.appendChild(imgDiv);
};
