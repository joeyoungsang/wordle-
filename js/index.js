const 정답 = "SNAKE";

const 게임종료 = () => {
  clearInterval(timer);
  displayGameover();
  window.removeEventListener("keydown", handleKeydown);
};
const displayGameover = () => {
  const div = document.createElement("div");
  div.innerText = "게임이 종료되었습니다!";
  div.style =
    "display:flex; justify-content:center; align-items:center; position:fixed; top:50%; left:45%; background-color:black; color:white; width:200px; height:100px; border: 3px solid gray";
  document.body.appendChild(div);
};

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const nextLine = () => {
    if (attempts === 6) return 게임종료();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력글자 = block.innerText;
      const 정답글자 = 정답[i];

      if (입력글자 === 정답글자) {
        맞은갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력글자)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#3a3a3cff";
      }
    }
    if (맞은갯수 === 5) {
      게임종료();
    } else {
      nextLine();
    }
  };

  const handleBackSpace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) {
      index -= 1;
    }
  };

  const handleKeydown = (event) => {
    const key = event.key;
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") {
      handleBackSpace();
    } else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key.toUpperCase();
      index += 1;
    }
  };

  const startTimer = () => {
    const 시작시간 = new Date();

    function setTime() {
      const 현재시간 = new Date();
      const 흐른시간 = new Date(현재시간 - 시작시간);
      const 시 = 흐른시간.getHours().toString().padStart(2, "0");
      const 분 = 흐른시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른시간.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.getElementById("timer");
      timeH1.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
