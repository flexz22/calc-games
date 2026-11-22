import "./style.css";
import { GAMES } from "./data/games.js";
import { convertSens, cm360 } from "./lib/sens.js";

const options = Object.entries(GAMES)
    .map(([id, g]) => `<option value="${id}">${g.name}</option>`)
    .join("");

document.querySelector("#app").innerHTML = `
  <h1>Conversor de Sensibilidade</h1>
  <label>De <select id="from">${options}</select></label>
  <label>Para <select id="to">${options}</select></label>
  <label>Sensibilidade <input id="sens" type="number" step="any" value="0.35"></label>
  <label>DPI <input id="dpi" type="number" value="800"></label>
  <div id="result"></div>
`;

const $ = (id) => document.getElementById(id);
$("from").value = "valorant";
$("to").value = "cs2";

function update() {
    const sens = parseFloat($("sens").value);
    const dpi = parseFloat($("dpi").value);
    if (!sens || !dpi) { $("result").textContent = ""; return; }

    const from = $("from").value;
    const to = $("to").value;
    $("result").innerHTML = `
    <p>${GAMES[to].name}: <strong>${convertSens(sens, from, to).toFixed(3)}</strong></p>
    <p>cm/360: <strong>${cm360(sens, from, dpi).toFixed(1)} cm</strong></p>`;
}

document.querySelectorAll("#app select, #app input")
    .forEach((el) => el.addEventListener("input", update));
update();