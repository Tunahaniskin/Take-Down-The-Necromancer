
export class Cards {
  constructor(x = 240, y = 500) {
    this.x = x;
    this.y = y;

    
    this.MaincardWidth = 162;
    this.MaincardHeight = 162;
    this.MaincardSpacing = 32; //yatay
    this.MainCardSpacingHeight = 20; //dikey
    this.MainstartX = this.x + this.MaincardSpacing;
    this.MainstartY = this.y + this.MainCardSpacingHeight;

    this.EnemycardWidth = 132;
    this.EnemycardHeight = 132;
    this.EnemycardSpacing = 16; // yatay
    this.EnemystartX = 780 + 180 + this.EnemycardSpacing; //enemy_x = 780
    this.EnemystartY = 300 + 14; //enemy_y = 300

    this.PlayercardWidth = 132;
    this.PlayercardHeight = 132;
    this.PlayercardSpacing = 16;
    this.PlayerstartX = 560 - 500 + this.PlayercardSpacing; // player_x = 560
    this.PlayerstartY = 300 + 14;  // player_y = 300,  playercardspacingheight = 14

    this.mainCards = [];  //seçim yapacağımız 5 kart ve her kartın 6 tane bölmesi olan dizi
    for (let i = 0; i < 5; i++) {
      this.mainCards[i] = new Array(6);
    }

    this.playerCards = [];  // oyuncunun seçeceği 3 kart ve her kartın 6 tane bölmesi olan dizi
    for (let i = 0; i < 3; i++) {
      this.playerCards[i] = new Array(6);
    }

    this.enemyCards = []; // düşmanın seçeceği 3 kart ve her kartın 6 tane bölmesi olan dizi
    for (let i = 0; i < 3; i++) {
      this.enemyCards[i] = new Array(6);
    }

    this.playerCardSelectCount = 0;
    const canvas = document.getElementById("gameCanvas");
    canvas.addEventListener("click", (event) => {
      if (this.playerCardSelectCount >= 3) return;
      let clickX = event.offsetX;
      let clickY = event.offsetY;
      for (let i = 0; i < 5; i++) {
        const cardstartX = this.MainstartX + i * (this.MaincardWidth + this.MaincardSpacing);
        const cardendX = cardstartX + this.MaincardWidth;
        const cardstartY = this.MainstartY;
        const cardendY = this.MainstartY + this.MaincardHeight;
        if (clickX >= cardstartX && clickX <= cardendX && clickY >= cardstartY && clickY <= cardendY) {
          
          if (!this.mainCards[i] || this.mainCards[i].every(val => !val)) {
            break;
          }
          this.playerCards[this.playerCardSelectCount] = this.mainCards[i];
          this.mainCards[i] = 0// Seçilen kartı sıfırla
          this.playerCardSelectCount++;
            break;
              }
      }
    });






  }
 drawCardsBar(ctx) {
    ctx.fillStyle = "rgb(87, 96, 56)";
    ctx.fillRect(this.x, this.y, 1002, 202);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    

    for (let i = 0; i < 5; i++) { // 5 tane kart olacak
      const cardX = this.MainstartX + i * (this.MaincardWidth + this.MaincardSpacing);
      ctx.strokeRect(cardX, this.MainstartY, this.MaincardWidth, this.MaincardHeight);

      // Ortadan ikiye bölen dikey çizgi
      ctx.lineWidth = 3; //pixel olarak kötü gözüktüğünden 3 yapıp daha sonra tekrar 2 ye çekiyorum altta
      ctx.beginPath();
      ctx.moveTo(cardX + this.MaincardWidth / 2, this.MainstartY);
      ctx.lineTo(cardX + this.MaincardWidth / 2, this.MainstartY + this.MaincardHeight);   
      ctx.stroke();

      // Yatayda eşit bölen iki çizgi
      ctx.lineWidth = 2;
      for(let j = 1 ; j<=2 ; j++){
        ctx.beginPath();
        ctx.moveTo(cardX, this.MainstartY + (this.MaincardHeight / 3) * j );
        ctx.lineTo(cardX + this.MaincardWidth, this.MainstartY + (this.MaincardHeight / 3) * j );
        ctx.stroke();
      }
    }
  }
  drawPlayerCardsBar(ctx, player_x, player_y) {
    ctx.fillStyle = "rgb(87, 96, 56)";
    ctx.fillRect(player_x - 500, player_y, 460, 160); 

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    

    for (let i = 0; i < 3; i++) { // 3 tane kart olacak
      const cardX = this.PlayerstartX + i * (this.PlayercardWidth + this.PlayercardSpacing);
      ctx.strokeRect(cardX, this.PlayerstartY, this.PlayercardWidth, this.PlayercardHeight);

      // Ortadan ikiye bölen dikey çizgi
      ctx.beginPath();
      ctx.moveTo(cardX + this.PlayercardWidth / 2, this.PlayerstartY);
      ctx.lineTo(cardX + this.PlayercardWidth / 2, this.PlayerstartY + this.PlayercardHeight);   
      ctx.stroke();

      // Yatayda eşit bölen iki çizgi
      for(let j = 1 ; j<=2 ; j++){
        ctx.beginPath();
        ctx.moveTo(cardX, this.PlayerstartY + (this.PlayercardHeight / 3) * j );
        ctx.lineTo(cardX + this.PlayercardWidth, this.PlayerstartY + (this.PlayercardHeight / 3) * j );
        ctx.stroke();
      }
    }
    
  }
  drawEnemyCardsBar(ctx, enemy_x, enemy_y) {
    ctx.fillStyle = "rgb(87, 96, 56)";
    ctx.fillRect(enemy_x + 180, enemy_y, 460, 160); 

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    for (let i = 0; i < 3; i++) {  // 3 tane kart olacak
      const cardX = this.EnemystartX + i * (this.EnemycardWidth + this.EnemycardSpacing);
      ctx.strokeRect(cardX, this.EnemystartY, this.EnemycardWidth, this.EnemycardHeight);

      // Ortadan ikiye bölen dikey çizgi
      ctx.beginPath();
      ctx.moveTo(cardX + this.EnemycardWidth / 2, this.EnemystartY);
      ctx.lineTo(cardX + this.EnemycardWidth / 2, this.EnemystartY + this.EnemycardHeight);   
      ctx.stroke();

      // Yatayda eşit bölen iki çizgi
      for(let j = 1 ; j<=2 ; j++){
        ctx.beginPath();
        ctx.moveTo(cardX, this.EnemystartY + (this.EnemycardHeight / 3) * j );
        ctx.lineTo(cardX + this.EnemycardWidth, this.EnemystartY + (this.EnemycardHeight / 3) * j );
        ctx.stroke();
      }
    }


  }
  generateCardsBarIcon(ctx){
    for(let i = 0; i < 5; i++) {    // seçim yapacağımız 5 kartın içeriklerinin rastgele belirlenmesi
      let j = 0
      
      for( ; j < 3; j++) {  // rastgele body ekleme

        this.mainCards[i][j] = Math.floor(Math.random() * 2); //0 ise yok 1 ise var

      }

      if(this.mainCards[i][0] === 0 && this.mainCards[i][1] === 0 && this.mainCards[i][2] === 0){  // eğer hiç body oluşmamışsa

        let temp = Math.floor(Math.random() * 3); // 0,1,2
        this.mainCards[i][temp] = 1; // rastgele birine body ekle bu sayede en az 1 tane body olacak
      }

      
      let temp = Math.floor(Math.random() * 3); // sword, shield, breaker seçimleri

    // oynanışın çok karışık olmaması açısından örneğin sword seçildiyse o kartın kalan kısımları da sword olacak

      if(temp === 0){  // sword 
             
        for( ; j < 6; j++) {  // rastgele sword ekleme

         this.mainCards[i][j] = Math.floor(Math.random() * 2); //0 ise yok 1 ise var
           
        }
        if(this.mainCards[i][3] === 0 && this.mainCards[i][4] === 0 && this.mainCards[i][5] === 0){  // eğer hiç sword oluşmamışsa

        let temp = Math.floor(Math.random() * 3 + 3); // 3,4,5
        this.mainCards[i][temp] = 1; // rastgele birine sword ekle bu sayede en az 1 tane sword olacak
      }
           
      }
      
      else if(temp === 1){    // shield
            
        for( ; j < 6; j++) {  // rastgele shield ekleme

           this.mainCards[i][j] = Math.floor(Math.random() * 2 + 2); //2 ise yok 3 ise var
           
        }
        if(this.mainCards[i][3] === 2 && this.mainCards[i][4] === 2 && this.mainCards[i][5] === 2){  // eğer hiç shield oluşmamışsa

        let temp = Math.floor(Math.random() * 3 + 3); // 4,5,6
        this.mainCards[i][temp] = 3; // rastgele birine shield ekle bu sayede en az 1 tane shield olacak
        }

      }
      
      else{   // shield breaker

        for( ; j < 6; j++) {  // rastgele breaker ekleme

          this.mainCards[i][j] = Math.floor(Math.random() * 2 + 4); //4 ise yok 5 ise var
           
        }
        if(this.mainCards[i][3] === 4 && this.mainCards[i][4] === 4 && this.mainCards[i][5] === 4){  // eğer hiç shield oluşmamışsa

        let temp = Math.floor(Math.random() * 3 + 3); // 4,5,6
        this.mainCards[i][temp] = 5; // rastgele birine breaker ekle bu sayede en az 1 tane breaker olacak
        }
           
      }
        
      
    }
    
    for(let i = 0; i < 3; i++) {    // enemy'nin 3 kartın içeriklerinin rastgele belirlenmesi
      let j = 0
      for( ; j < 3; j++) {  // rastgele body ekleme

        this.enemyCards[i][j] = Math.floor(Math.random() * 2); //0 ise yok 1 ise var

      }

      if(this.enemyCards[i][0] === 0 && this.enemyCards[i][1] === 0 && this.enemyCards[i][2] === 0){  // eğer hiç body oluşmamışsa

        let temp = Math.floor(Math.random() * 3); // 0,1,2
        this.enemyCards[i][temp] = 1; // rastgele birine body ekle bu sayede en az 1 tane body olacak
      }

      let temp = Math.floor(Math.random() * 3); // sword, shield, breaker seçimleri

    // oynanışın çok karışık olmaması açısından örneğin sword seçildiyse o kartın kalan kısımları da sword olacak

      if(temp === 0){  // sword 
               
        for( ; j < 6; j++) {  // rastgele sword ekleme

         this.enemyCards[i][j] = Math.floor(Math.random() * 2); //0 ise yok 1 ise var
           
        }
        if(this.enemyCards[i][3] === 0 && this.enemyCards[i][4] === 0 && this.enemyCards[i][5] === 0){  // eğer hiç sword oluşmamışsa

        let temp = Math.floor(Math.random() * 3 + 3); // 3,4,5
        this.enemyCards[i][temp] = 1; // rastgele birine sword ekle bu sayede en az 1 tane sword olacak
      }
           
      }
      
      else if(temp === 1){    // shield
            
        for( ; j < 6; j++) {  // rastgele shield ekleme

           this.enemyCards[i][j] = Math.floor(Math.random() * 2 + 2); //2 ise yok 3 ise var
           
        }
        if(this.enemyCards[i][3] === 2 && this.enemyCards[i][4] === 2 && this.enemyCards[i][5] === 2){  // eğer hiç shield oluşmamışsa

        let temp = Math.floor(Math.random() * 3 + 3); // 4,5,6
        this.enemyCards[i][temp] = 3; // rastgele birine shield ekle bu sayede en az 1 tane shield olacak
        }

      }
      
      else{   // shield breaker

        for( ; j < 6; j++) {  // rastgele breaker ekleme

          this.enemyCards[i][j] = Math.floor(Math.random() * 2 + 4); //4 ise yok 5 ise var
           
        }
        if(this.enemyCards[i][3] === 4 && this.enemyCards[i][4] === 4 && this.enemyCards[i][5] === 4){  // eğer hiç shield oluşmamışsa

        let temp = Math.floor(Math.random() * 3 + 3); // 4,5,6
        this.enemyCards[i][temp] = 5; // rastgele birine breaker ekle bu sayede en az 1 tane breaker olacak
        }
           
      }

      
    }

  }
  drawCardsBarIcon(ctx) {
     
    for(let i = 0 ; i < 5 ; i++) { // main kartların iconlarını çizdirme
      let j = 0;
      ctx.fillStyle = "black";
      ctx.font = "28px Arial";
      const cardX = this.MainstartX + i * (this.MaincardWidth + this.MaincardSpacing);

      
      for(; j < 3; j++) {
        if(this.mainCards[i][j] === 1){ // boyd çizdirme
          const cardY = this.MainstartY + (this.MaincardHeight / 3) * j + (this.MaincardHeight / 3) / 2;
          ctx.fillText("Body", cardX + 2, cardY );
        }
      }
      for( ; j < 6; j++) {
        if(this.mainCards[i][j] === 1){   // sword gelirse
          const cardY = this.MainstartY + (this.MaincardHeight / 3) * (j - 3) + (this.MaincardHeight / 3) / 2;
          ctx.fillText("Sword", cardX + this.MaincardWidth / 2 + 4, cardY );    
        }
         if(this.mainCards[i][j] === 3){   // shield gelirse
          const cardY = this.MainstartY + (this.MaincardHeight / 3) * (j - 3) + (this.MaincardHeight / 3) / 2;
          ctx.fillText("Shield", cardX + this.MaincardWidth / 2 + 4, cardY );    
        }
         if(this.mainCards[i][j] === 5){   // breaker gelirse
          ctx.font = "20px Arial";
          const cardY = this.MainstartY + (this.MaincardHeight / 3) * (j - 3) + (this.MaincardHeight / 3) / 2;
          ctx.fillText("Breaker", cardX + this.MaincardWidth / 2 + 4, cardY );    
        }
      }

    }
    for(let i = 0 ; i < 3 ; i++){// enemy kartların iconları
      let j = 0;
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      const cardX = this.EnemystartX + i * (this.EnemycardWidth + this.EnemycardSpacing);

      
      for(; j < 3; j++) {
        if(this.enemyCards[i][j] === 1){
          const cardY = this.EnemystartY + (this.EnemycardHeight / 3) * j + (this.EnemycardHeight / 3) / 2;
          ctx.fillText("Body", cardX + this.EnemycardWidth / 2 + 4, cardY );
        }
      }
      for( ; j < 6; j++) {
        
        if(this.enemyCards[i][j] === 1){   // sword gelirse
          const cardY = this.EnemystartY + (this.EnemycardHeight / 3) * (j - 3) + (this.EnemycardHeight / 3) / 2;
          ctx.fillText("Sword", cardX  + 4, cardY );    
        }
         if(this.enemyCards[i][j] === 3){   // shield gelirse
          const cardY = this.EnemystartY + (this.EnemycardHeight / 3) * (j - 3) + (this.EnemycardHeight / 3) / 2;
          ctx.fillText("Shield", cardX + 4, cardY );    
        }
         if(this.enemyCards[i][j] === 5){   // breaker gelirse
          ctx.font = "16px Arial";
          const cardY = this.EnemystartY + (this.EnemycardHeight / 3) * (j - 3) + (this.EnemycardHeight / 3) / 2;
          ctx.fillText("Breaker", cardX + 4, cardY );    
        }
      }

    }
    
    for(let i = 0 ; i < 3 ; i++){// player kartların iconları
      let j = 0;
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      const cardX = this.PlayerstartX + 500 - this.PlayercardWidth - 4 * this.PlayercardSpacing - i * (this.PlayercardWidth + this.PlayercardSpacing);

      
      for(; j < 3; j++) {
        if(this.playerCards[i][j] === 1){ // body çizdirme
          const cardY = this.PlayerstartY + (this.PlayercardHeight / 3) * j + (this.PlayercardHeight / 3) / 2;
          ctx.fillText("Body", cardX , cardY );
        }
      }
      for( ; j < 6; j++) {
        
        if(this.playerCards[i][j] === 1){   // sword gelirse
          const cardY = this.PlayerstartY + (this.PlayercardHeight / 3) * (j - 3) + (this.PlayercardHeight / 3) / 2;
          ctx.fillText("Sword", cardX + this.PlayercardWidth / 2  , cardY );    
        }
         if(this.playerCards[i][j] === 3){   // shield gelirse
          const cardY = this.PlayerstartY + (this.PlayercardHeight / 3) * (j - 3) + (this.PlayercardHeight / 3) / 2;
          ctx.fillText("Shield", cardX + this.PlayercardWidth / 2  , cardY );    
        }
         if(this.playerCards[i][j] === 5){   // breaker gelirse
          ctx.font = "16px Arial";
          const cardY = this.PlayerstartY + (this.PlayercardHeight / 3) * (j - 3) + (this.PlayercardHeight / 3) / 2;
          ctx.fillText("Breaker", cardX + this.PlayercardWidth / 2 -2 , cardY );    
        }
      }

    }
   
  }

  // Her round başında çağır:
  resetPlayerCardsForNewRound() {
    for (let i = 0; i < 3; i++) {
      this.playerCards[i] = new Array(6).fill(0);
    }
    this.playerCardSelectCount = 0;
  }

}