import { useEffect, useRef } from "react";

export default function LeafFalling() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Leaf / Particle definition
    interface Particle {
      x: number;
      y: number;
      r: number; // size radius
      d: number; // density
      color: string;
      speed: number;
      swing: number;
      swingSpeed: number;
      rotation: number;
      rotationSpeed: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 25; // Keep it low for mobile performance

    const colors = [
      "rgba(16, 185, 129, 0.25)", // green-500
      "rgba(52, 211, 153, 0.2)",  // green-400
      "rgba(110, 231, 183, 0.2)", // emerald-300
      "rgba(255, 255, 255, 0.15)", // translucent white
      "rgba(5, 150, 105, 0.2)",   // green-600
    ];

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 8 + 4,
        d: Math.random() * maxParticles,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.8 + 0.4,
        swing: Math.random() * 2 + 1,
        swingSpeed: Math.random() * 0.01 + 0.005,
        rotation: Math.random() * Math.PI,
        rotationSpeed: Math.random() * 0.02 - 0.01,
      });
    }

    let angle = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.01;

      for (let i = 0; i < maxParticles; i++) {
        const p = particles[i];

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Draw an organic leaf shape
        ctx.beginPath();
        ctx.fillStyle = p.color;
        
        // Draw path of leaf
        ctx.ellipse(0, 0, p.r * 1.5, p.r * 0.7, 0, 0, 2 * Math.PI);
        ctx.fill();

        // Draw a stem line
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.lineWidth = 1;
        ctx.moveTo(-p.r * 1.5, 0);
        ctx.lineTo(p.r * 1.5, 0);
        ctx.stroke();

        ctx.restore();

        // Update positions
        p.y += p.speed;
        p.x += Math.sin(angle + p.d) * 0.5;
        p.rotation += p.rotationSpeed;

        // Reset particles that fall off the screen
        if (p.y > height + 20) {
          particles[i] = {
            ...p,
            x: Math.random() * width,
            y: -20,
            speed: Math.random() * 0.8 + 0.4,
            rotation: Math.random() * Math.PI,
          };
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
