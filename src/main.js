import "./style.css";
import { GAMES } from "./data/games.js";
import { convertSens, cm360 } from "./lib/sens.js";
import { eDPI, sensForNewDpi } from "./lib/dpi.js";
import { supabase } from "./lib/supabase.js";

const options = Object.entries(GAMES)
    .map(([id, g]) => `<option value="${id}">${g.name}</option>`)
    .join("");

document.querySelector("#app").innerHTML = `
  <h1>Conversor de Sensibilidade</h1>
  <label>De <select id="from">${options}</select></label>
  <label>Para <select id="to">${options}</select></label>
  <label>Sensibilidade <input id="sens" type="number" step="any" value="0.35"></label>
  <label>DPI <input id="dpi" type="number" value="800"></label>
    <label>DPI novo (opcional) <input id="newdpi" type="number" value="1600"></label>
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
    const newDpi = parseFloat($("newdpi").value);
    const dpiBlock = newDpi
        ? `<p>Com ${newDpi} DPI, use <strong>${sensForNewDpi(sens, dpi, newDpi).toFixed(4)}</strong> em ${GAMES[from].name}</p>`
        : "";

    $("result").innerHTML = `
    <p>${GAMES[to].name}: <strong>${convertSens(sens, from, to).toFixed(3)}</strong></p>
    <p>cm/360: <strong>${cm360(sens, from, dpi).toFixed(1)} cm</strong></p>
    <p>eDPI: <strong>${eDPI(dpi, sens).toFixed(0)}</strong></p>
    ${dpiBlock}`;
}

document.querySelectorAll("#app select, #app input")
    .forEach((el) => el.addEventListener("input", update));
update();
