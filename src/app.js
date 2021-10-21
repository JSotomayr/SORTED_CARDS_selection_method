/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

const BODY = document.querySelector("body");

const SYMBOLCARD = ["♦", "♥", "♠", "♣"];
const CARDITEM = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const CARDSINPUT = document.querySelector(".ncards");

const DRAW_BUTTON = document.querySelector("form");
const SORT_BUTTON = document.querySelector(".sort");
const ROW = document.querySelector("section");

window.onload = function() {};

function newCard() {
  return {
    item: CARDITEM[getRandom(CARDITEM)],
    pattern: SYMBOLCARD[getRandom(SYMBOLCARD)]
  };
}

function getRandom(list) {
  let position = Math.floor(Math.random() * list.length);
  return position;
}

//A PARTIR DE AQUI ES CREAR CARTAS Y ORDENARLAS
function drawCards(object) {
  for (const card of object) {
    let back = document.createElement("div");
    back.classList.add("card");
    ROW.appendChild(back);

    let top = document.createElement("div");
    top.classList.add("header");
    top.innerHTML = card["item"] + card["pattern"];
    back.appendChild(top);

    let main = document.createElement("div");
    main.classList.add("main");
    main.innerHTML = card["pattern"];
    back.appendChild(main);

    let bottom = document.createElement("div");
    bottom.classList.add("footer");
    bottom.innerHTML = card["item"] + card["pattern"];
    back.appendChild(bottom);

    if (card["pattern"] == "♠" || card["pattern"] == "♣") {
      top.classList.add("color2");
      main.classList.add("color2");
      bottom.classList.add("color2");
    } else {
      top.classList.add("color1");
      main.classList.add("color1");
      bottom.classList.add("color1");
    }
  }
}
let cards = [];
DRAW_BUTTON.addEventListener("submit", event => {
  event.preventDefault();
  ROW.innerHTML = "";
  cards = [];

  for (let i = 0; i < CARDSINPUT.value; i++) {
    cards.push(newCard());
  }

  drawCards(cards);
});

SORT_BUTTON.addEventListener("click", event => {
  event.preventDefault();

  let n = cards.length;

  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (cards[j].item < cards[min].item) {
        min = j;
      }
    }
    if (min != i) {
      let tmp = cards[i].item;
      cards[i].item = cards[min].item;
      cards[min].item = tmp;
    }
  }
  ROW.innerHTML = "";
  drawCards(cards);
});
