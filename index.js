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
cards.resetCardsForNewRound(ctx);
document.getElementById("attackBtn").onclick = () => battle(ctx);

  
 

function drawAll(timestamp) {
ctx.clearRect(0, 0, canvas.width, canvas.height);
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


function battle(ctx){
  if(player.health <= 0 || enemy.health <= 0) {
    if(player.health <= 0) {
      alert("You lost the battle!");
    } else {
      alert("You won the battle!");
    }
        
    return;
  }

  for(let i = 0; i < 3; i++) { //kart numaraları

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
              }
              
            }
            
          
        }
      }
      
    
    }
  }
}

