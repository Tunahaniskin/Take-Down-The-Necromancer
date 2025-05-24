export class Player {
  constructor(x = 560, y = 300) {
    this.x = x;
    this.y = y;
    this.health = 40;
    this.healthBarWidth = 400;
    this.healthBarHeight = 50;
    this.healthBarX = x - 324;
    this.healthBarY = y - 200;

    // Health icon animasyon değişkenleri
    this.HealthIcon = new Image();
    this.HealthIcon.src = "HealthIconSheet.png";
    this.HealthFrameWidth = 32;
    this.HealthFrameHeight = 32;
    this.HealthFrameCount = 11;
    this.HealthRowIndex = 6;
    this.HealthCurrentFrame = 10;
    this.HealthLastFrameTime = 0;
    this.HealthFrameDuration = 150;
    this.HealthPosX = this.healthBarX + this.healthBarWidth + 7;
    this.HealthPosY = this.y - 200;
  }

  drawPlayer(ctx) {
    ctx.fillStyle = "rgb(11, 79, 11)";
    ctx.fillRect(this.x, this.y, 140, 160);
  }

  drawHealthBar(ctx) {
    ctx.fillStyle = "rgb(108, 100, 71)";
    ctx.fillRect(this.healthBarX, this.healthBarY, this.healthBarWidth, this.healthBarHeight);
  }

  drawHealthIcon(ctx, timestamp) {
    
    // Animasyon karesi güncelle
    if (timestamp - this.HealthLastFrameTime > this.HealthFrameDuration) {
      this.HealthCurrentFrame--; 
      if (this.HealthCurrentFrame < 0) {
        this.HealthCurrentFrame = this.HealthFrameCount - 1;
      }
      this.HealthLastFrameTime = timestamp;
    }

    ctx.drawImage(
      this.HealthIcon,
      this.HealthCurrentFrame * this.HealthFrameWidth, // Kaynak X (frame indexine göre)
      this.HealthRowIndex * this.HealthFrameHeight,    // Kaynak Y (satır indexine göre)
      this.HealthFrameWidth, this.HealthFrameHeight,   // Kaynak genişlik ve yükseklik
      this.HealthPosX, this.HealthPosY,                // Tuvalde çizilecek X ve Y
      64, 64                                           // Çizilecek genişlik ve yükseklik
    );
  }
}
