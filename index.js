import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Cards } from "./cards.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // sayfa açılır açılmaz çalıştır

const player = new Player();
const enemy = new Enemy();
const cards = new Cards();


cards.generateCardsBarIcon();
cards.resetPlayerCardsForNewRound();
  
 

function drawAll(timestamp) {

  player.drawPlayer(ctx);
  player.drawHealthBar(ctx);
  player.drawHealthIcon(ctx, timestamp);
  

  enemy.drawEnemy(ctx);
  enemy.drawHealthBar(ctx);
  enemy.drawHealthIcon(ctx,timestamp);
  enemy.drawComboStatus(ctx);

  

  cards.drawPlayerCardsBar(ctx, player.x, player.y);  
  cards.drawCardsBar(ctx);
  cards.drawEnemyCardsBar(ctx, enemy.x, enemy.y);
  cards.drawCardsBarIcon(ctx); 
  
  

  requestAnimationFrame(drawAll);
}

player.HealthIcon.onload = () => {
  requestAnimationFrame(drawAll);
};

