import { GAMES } from "../data/games.js";

export const convertSens = (sens, from, to) =>
  sens * GAMES[from].yaw / GAMES[to].yaw;

export const cm360 = (sens, game, dpi) =>
  (360 / (sens * GAMES[game].yaw * dpi)) * 2.54;