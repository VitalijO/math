class Particle {
    constructor(x, y, size, shape, color, velocity) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.shape = shape;
      this.color = color;
      this.velocity = velocity;
      this.opacity = 1; // Starting opacity
      this.fadeRate = 0.025; // Fade rate per frame
      this.fadeStartDistance = 45; // Distance from border to start fading
    }
  
    update(canvasWidth, canvasHeight) {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
  
      // Check if particle is close to the canvas borders
      const distanceFromBorder = Math.min(
        this.x,
        canvasWidth - this.x,
        this.y,
        canvasHeight - this.y
      );
  
      // Start fading the particle when it's close to the border
      if (distanceFromBorder <= this.fadeStartDistance) {
        this.opacity -= this.fadeRate;
      }
  
      // Remove the particle if it's outside the canvas or faded out
      if (
        this.x + this.size < 0 ||
        this.x - this.size > canvasWidth ||
        this.y + this.size < 0 ||
        this.y - this.size > canvasHeight ||
        this.opacity <= 0
      ) {
        return false; // Return false to remove particle from the array
      }
  
      return true; // Return true to keep particle in the array
    }
  
    draw(ctx) {
      ctx.beginPath();
      switch (this.shape) {
        case "circle":
          ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
          break;
        case "square":
          ctx.rect(
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size
          );
          break;
        case "triangle":
          ctx.moveTo(this.x, this.y - this.size / 2);
          ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
          ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
          ctx.closePath();
          break;
        case "hollow-circle":
          ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        case "hollow-square":
          ctx.strokeRect(
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size
          );
          break;
        case "hollow-triangle":
          ctx.moveTo(this.x, this.y - this.size / 2);
          ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
          ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
          ctx.closePath();
          ctx.stroke();
          break;
      }
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${this.color}, ${this.opacity})`;
      ctx.stroke();
    }
  }
  
  const buttonContainers = document.querySelectorAll(".btn-container");
  
  buttonContainers.forEach((buttonContainer, i) => {
    const canvas = buttonContainer.querySelector(".btn-canvas");
    const ctx = canvas.getContext("2d");
  
    const size = {
      width: buttonContainer.offsetWidth * 1.5,
      height: buttonContainer.offsetHeight * 2.5
  };
    canvas.width = size.width;
    canvas.height = size.height;
  
    const buttonColor = buttonContainer.dataset.color;
  
    const particles = [];
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        if (!particle.update(canvas.width, canvas.height)) {
          particles.splice(i, 1);
          i--;
        } else {
          particle.draw(ctx);
        }
      }
  
      requestAnimationFrame(animate);
    }
  
    function createParticle() {
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const size = Math.random() * 5 + 5;
      const shape = [
        "circle",
        "square",
        "triangle",
        "hollow-circle",
        "hollow-square",
        "hollow-triangle"
      ][Math.floor(Math.random() * 6)];
      const color = buttonColor;
      const velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      };
      particles.push(new Particle(x, y, size, shape, color, velocity));
    }
  
    setInterval(createParticle, 400); // Create a new particle every 100 milliseconds
    animate();
  });