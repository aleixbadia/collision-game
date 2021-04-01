class Enemy {
  constructor(canvas, positionY, speed) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.size = 20
    this.x = this.canvas.width;
    this.y = positionY;

    this.speed = speed;
  }

  draw() {
    this.ctx.fillStyle = "#FF6F27";
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  updatePosition() {
      // Restamos la dirección para traer a los enemigos des de fuera del canvas hacia adentro
      this.x -= this.speed
  }

  isInsideScreen() {
    const enemyRight = this.x + this.size;
    const screenLeft = 0;
    const isInside = enemyRight > screenLeft;
    return isInside;
    //return this.x + this.size > 0;
  }
}
