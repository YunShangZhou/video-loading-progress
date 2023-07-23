const btns = document.querySelector(".btns");
const videoRef = document.querySelector("video");
const onlineProgress = document.querySelector(".online-progress");
const videoList = [
  "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  "https://media.w3.org/2010/05/sintel/trailer.mp4",
];

const progressPartMap = {
  demo: {
    left: 10,
    width: "20px",
  },
};
let lastLength = 0;
const handleVideoEvent = () => {
  let duration = videoRef.duration;

  let timeRange = videoRef.buffered;
  const timeRangeLength = timeRange.length;
  // console.log(`timeRange`, timeRange);

  let partList = document.querySelectorAll(`.player-bar-progress-part`);

  for (let i = 0; i <= timeRangeLength - 1; i++) {
    let start = timeRange.start(i);
    let end = timeRange.end(i);
    // console.log(`start`, start);
    // console.log(`end`, end);
    // console.log(`duration`, duration);

    progressPartMap[i] = {
      left: (start / duration) * 100,
      width: ((end - start) / duration) * 100,
    };
    if (!partList[i]) {
      let div = document.createElement("div");
      div.setAttribute("class", `player-bar-progress-part`);
      div.style.setProperty("left", progressPartMap[i].left + "%");
      div.style.setProperty("width", progressPartMap[i].width + "%");
      onlineProgress.appendChild(div);
    } else {
      partList[i].style.left = progressPartMap[i].left + "%";
      partList[i].style.width = progressPartMap[i].width + "%";
    }

    // console.log(`timeRange.start(${i})`, timeRange.start(i));
    // console.log(`timeRange.end(${i})`, timeRange.end(i));
  }
};
videoRef.addEventListener("progress", handleVideoEvent);

let source = null;
let lastSourceIndex = 0;
btns.addEventListener("click", (e) => {
  const index = e.target.className.split("btn")[1];
  if (!source) {
    source = document.createElement("source");
    source.setAttribute("type", "video/mp4");
    source.setAttribute("src", videoList[index - 1]);
    videoRef.appendChild(source);
  } else {
    document.location.reload();
  }
});

window.onload = () => {
  let count = 1;
  const btnsRef = document.querySelector(".btns");
  while (count <= videoList.length) {
    let div = document.createElement("button");
    div.setAttribute("type", "button");
    div.setAttribute("class", `btn${count}`);
    div.textContent = `demo${count}`;
    btnsRef.appendChild(div);
    count++;
  }
};
