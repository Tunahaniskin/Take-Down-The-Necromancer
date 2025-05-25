import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Cards } from "./cards.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let isBattleActive = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // sayfa açılır açılmaz çalıştır

const player = new Player();
const enemy = new Enemy();
const cards = new Cards();

const backgroundMusic = document.getElementById("backgroundMusic");
backgroundMusic.volume = 0.3; // Müzik ses seviyesi


cards.generateCardsBarIcon();

cards.resetCardsForNewRound(ctx);
document.getElementById("attackBtn").onclick = () => battle(ctx);

document.getElementById("startGame").style.visibility = "visible";
document.getElementById("startGame").onclick = () => requestAnimationFrame(gameLoop);
document.getElementById("startGame").addEventListener("click", () => {
  backgroundMusic.play().catch((error) => {
    console.error("Müzik oynatılamadı:", error);
  });
});
document.getElementById("attackBtn").style.visibility = "hidden";
document.getElementById("restartBtn").style.visibility = "hidden";

  
 

async  function gameLoop(timestamp) {
ctx.clearRect(0, 0, canvas.width, canvas.height);
document.getElementById("attackBtn").style.visibility = "visible";
document.getElementById("restartBtn").style.visibility = "hidden";
document.getElementById("startGame").style.visibility = "hidden";

document.getElementById("attackBtn").addEventListener("click", () => {
  actionMusic.play().catch((error) => {
    console.error("Müzik oynatılamadı:", error);
  });
});







document.getElementById("attackBtn").onclick = () => {
  isBattleActive = true;
};

document.getElementById("restartBtn").onclick = () => {
  requestAnimationFrame(gameLoop);
  player.health = 20;
  enemy.health = 20;
  player.combo = 0;
  enemy.combo = 0;
  cards.generateCardsBarIcon();
  cards.resetCardsForNewRound(ctx);

};

   if(player.health <= 0 || enemy.health <= 0) {
    if(player.health <= 0) {

      ctx.fillStyle = "black";
      ctx.font = "40px Arial";
      ctx.fillText("You lost the game", player.x + 20, player.y + 250);

      player.drawPlayerDeath(ctx, timestamp);
      enemy.drawEnemyIdle(ctx,timestamp);
    } else {
      ctx.fillStyle = "black";
      ctx.font = "40px Arial";
      ctx.fillText("You won the game", player.x + 20, player.y + 250);
    }
        document.getElementById("attackBtn").style.visibility = "hidden";
        document.getElementById("restartBtn").style.visibility = "visible";
        
    return;
  }

  player.drawPlayerIdle(ctx,timestamp);
  
  player.drawHealthBar(ctx);
  player.drawHealthIcon(ctx, timestamp);
  player.drawComboStatus(ctx);
  

  enemy.drawEnemyIdle(ctx,timestamp);
 
  enemy.drawHealthBar(ctx);
  enemy.drawHealthIcon(ctx,timestamp);
  enemy.drawComboStatus(ctx);

  

  cards.drawPlayerCardsBar(ctx, player.x, player.y);  
  cards.drawCardsBar(ctx);
  cards.drawEnemyCardsBar(ctx, enemy.x, enemy.y);
  cards.drawCardsBarIcon(ctx);

  if(isBattleActive){

    battle(ctx);
    isBattleActive = false;
    cards.generateCardsBarIcon();
    cards.resetCardsForNewRound(ctx); 

    }
    
    
  

  requestAnimationFrame(gameLoop);
}




function battle(ctx){
  if(player.health <= 0 || enemy.health <= 0) {
    if(player.health <= 0) {
      alert("You lost the battle!");
     
    } else {
      alert("You won the battle!");
     
    }
        
    return;
  }
  isBattleActive = true;

  
  for(let i = 0; i < 3; i++){ // battle için i değeri 0, 1, 2
    for(let j = 0; j < 3; j++){ // body var mı yok mu kontrolü

      let TempPlayerHealth = player.health;

      if(cards.playerCards[i][j]=== 1 || cards.enemyCards[i][j] === 1) {
        if(cards.playerCards[i][j]=== 1){ // player body var
        
          //shield <-> breaker karşılşaması 
            if(cards.playerCards[i][j+3] === 3 && cards.enemyCards[i][j+3] === 5) {
              player.health -= enemy.combo + 1; // player hasar alır
              enemy.combo += 1; // enemy combo artar
              player.combo = 0; // player combo sıfırlanır
             

              ctx.fillStyle = "black";
              ctx.font = "28px Arial";
              ctx.fillText(enemy.combo + 1, player.HealthPosX + 2, player.HealthPosY + 30);

            }
            //player'da shield harici herhangi bir şey <-> enemy'de sword karşılaşması
            else if((cards.playerCards[i][j+3] === 0 ||
                     cards.playerCards[i][j+3] === 1 ||
                     cards.playerCards[i][j+3] === 2 ||
                     cards.playerCards[i][j+3] === 4 ||
                     cards.playerCards[i][j+3] === 5
            ) && cards.enemyCards[i][j+3] === 1) {

              player.health -= enemy.combo + 1; // player hasar alır
              enemy.combo += 1; // enemy combo artar
              player.combo = 0; // player combo sıfırlanır
              
              
            }
        
        }
        if(cards.enemyCards[i][j] === 1){ // enemy body (var if tanımlamamın sebebi hem player hem de enemy body olabilir) 
                                          //else if yaparak 2'ninde bulunduğu durumu yapmak istemedim kod uzamasın diye o yüzde if yaptım
          //shield <-> breaker karşılşaması 
            if(cards.enemyCards[i][j+3] === 3 && cards.playerCards[i][j+3] === 5) {
              enemy.health -= player.combo + 1; // enemy hasar alır
              player.combo += 1; // player combo artar
              enemy.combo = 0; // enemy combo sıfırlanır
              
             
              if(TempPlayerHealth !== player.health) { // ikisinin de hasar aldığı durumda player combosunu sıfırlıyoruz
                player.combo = 0; // player combo sıfırlanır
                enemy.combo = 0; // enemy combo sıfırlanır
                
              }
              
            }
            //enemy'de shield harici herhangi bir şey <-> player'da sword karşılaşması
            else if((cards.enemyCards[i][j+3] === 0 ||
                     cards.enemyCards[i][j+3] === 1 ||
                     cards.enemyCards[i][j+3] === 2 ||
                     cards.enemyCards[i][j+3] === 4 ||
                     cards.enemyCards[i][j+3] === 5
                     
            ) && cards.playerCards[i][j+3] === 1) {
              enemy.health -= player.combo + 1; // enemy hasar alır
              player.combo += 1; // player combo artar
              enemy.combo = 0; // enemy combo sıfırlanır
              
             
              if(TempPlayerHealth !== player.health) { // ikisinin de hasar aldığı durumda player combosunu sıfırlıyoruz
               player.combo = 0; // player combo sıfırlanır
               enemy.combo = 0; // enemy combo sıfırlanır
               
              }
              
            }
            
          
        }
      }
      
    
    }
  }
  
  
}

