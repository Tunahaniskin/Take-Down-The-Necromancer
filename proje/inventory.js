export class Inventory {
  constructor(x = 120, y = 250) {
    this.x = x;
    this.y = y;
    
  }

  drawInventory(ctx) {
    ctx.fillStyle = "rgb(87, 96, 56)";
    ctx.fillRect(this.x, this.y, this.cardWidth * this.cardCount + this.cardSpacing * (this.cardCount - 1), this.cardHeight);
  }
}