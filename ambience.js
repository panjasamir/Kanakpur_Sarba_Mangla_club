/* V4: distinct section scenery, multi-colour fireworks and edge spark fountains. */
(() => {
  const sections = document.querySelectorAll(".section,.closing");
  sections.forEach((section, i) => {
    section.classList.add("scene-section");
    const scene = document.createElement("div");
    scene.className = "scene-decoration";
    scene.setAttribute("aria-hidden", "true");
    scene.innerHTML =
      '<div class="scene-photo"></div><div class="scene-mandala">✺</div><div class="hanging-lamp lamp-left"><span>✧</span><i></i></div><div class="hanging-lamp lamp-right"><span>✧</span><i></i></div><div class="floating-petals">✧ &nbsp; ✦ &nbsp; ✧</div><div class="scene-orb orb-one"></div><div class="scene-orb orb-two"></div><div class="section-diyas">' +
      Array.from(
        { length: 5 },
        (_, n) =>
          `<div class="mini-diya" style="--offset:${n * 0.47}s"><i></i></div>`,
      ).join("") +
      "</div>";
    section.prepend(scene);
  });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("scene-visible", e.isIntersecting),
        ),
      { rootMargin: "80px" },
    );
    sections.forEach((s) => observer.observe(s));
  } else sections.forEach((s) => s.classList.add("scene-visible"));
  const canvas = document.createElement("canvas");
  canvas.className = "festival-fireworks";
  canvas.setAttribute("aria-hidden", "true");
  document.body.append(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let width,
    height,
    particles = [],
    rockets = [],
    next = 0,
    last = 0,
    running = false,
    visible = !document.hidden,
    fountainClock = 0;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)"),
    palettes = [
      ["#ffd580", "#ff8a62"],
      ["#fa88ba", "#d2acff"],
      ["#89e9e5", "#d9ffb7"],
      ["#b4b5ff", "#ffdb8f"],
    ];
  function resize() {
    width = innerWidth;
    height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  resize();
  addEventListener("resize", resize);
  function explode(x, y) {
    const colors = palettes[Math.floor(Math.random() * palettes.length)],
      mobile = width < 700,
      count = mobile ? 80 : 140,
      style = Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI * 2) / count,
        speed =
          (style === 0
            ? 0.16 + Math.random() * 0.035
            : 0.1 + Math.random() * 0.12) * (mobile ? 0.58 : 1);
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: style === 2 ? 3100 : 2700,
        max: style === 2 ? 3100 : 2700,
        color: colors[i % 2],
        gravity: style === 2 ? 0.000035 : 0.000018,
        trail: style === 1 ? 150 : 105,
        weight: 2.2,
      });
    }
    if (!mobile)
      for (let i = 0; i < 40; i++) {
        const a = (i * Math.PI * 2) / 40;
        particles.push({
          x,
          y,
          vx: Math.cos(a) * 0.045,
          vy: Math.sin(a) * 0.045,
          life: 1400,
          max: 1400,
          color: "#fff0c3",
          gravity: 0.000018,
          trail: 45,
          weight: 1.8,
        });
      }
  }
  function fountain() {
    const x = Math.random() > 0.5 ? width * 0.025 : width * 0.975;
    for (let i = 0; i < 3; i++)
      particles.push({
        x,
        y: height + 5,
        vx: (Math.random() - 0.5) * 0.055,
        vy: -0.1 - Math.random() * 0.12,
        life: 1600,
        max: 1600,
        color: Math.random() > 0.5 ? "#ffd989" : "#f3a66c",
        gravity: 0.00011,
        trail: 35,
        weight: 1,
      });
  }
  function allowed() {
    return !document.body.classList.contains("paused") && visible;
  }
  function tick(now) {
    if (!allowed()) {
      running = false;
      ctx.clearRect(0, 0, width, height);
      particles = [];
      rockets = [];
      return;
    }
    const dt = Math.min(now - last || 16, 36);
    last = now;
    ctx.clearRect(0, 0, width, height);
    const mobile = width < 700;
    if (now > next) {
      const side = Math.random() > 0.5;
      rockets.push({
        x: width * (side ? 0.7 : 0.3),
        y: height * 0.99,
        target: height * (0.25 + Math.random() * 0.15),
        speed: 0.4 + Math.random() * 0.1,
      });
      if (!mobile && Math.random() > 0.55)
        rockets.push({
          x: width * (side ? 0.3 : 0.7),
          y: height * 1.1,
          target: height * 0.35,
          speed: 0.37,
        });
      next = now + (mobile ? 2700 : 1700) + Math.random() * 650;
    }
    fountainClock += dt;
    if (fountainClock > (mobile ? 220 : 130)) {
      fountain();
      fountainClock = 0;
    }
    rockets = rockets.filter((r) => {
      r.y -= dt * r.speed;
      ctx.globalAlpha = 0.65;
      ctx.strokeStyle = "#ffde9a";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(r.x, r.y + 65);
      ctx.lineTo(r.x, r.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(r.x, r.y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = "#ffeab9";
      ctx.fill();
      if (r.y < r.target) {
        explode(r.x, r.y);
        return false;
      }
      return true;
    });
    if (particles.length > 950) particles = particles.slice(-950);
    particles = particles.filter((p) => {
      p.life -= dt;
      if (p.life <= 0) return false;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += p.gravity * dt;
      ctx.globalAlpha = Math.min(0.95, p.life / p.max);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = p.weight;
      ctx.beginPath();
      ctx.moveTo(p.x - p.vx * p.trail, p.y - p.vy * p.trail);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      return true;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  function start() {
    if (!running && allowed()) {
      running = true;
      last = performance.now();
      next = last + 450;
      requestAnimationFrame(tick);
    }
  }
  new MutationObserver(start).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });
  document.addEventListener("visibilitychange", () => {
    visible = !document.hidden;
    start();
  });
  start();
  if (!reduced.matches && matchMedia("(pointer:fine)").matches) {
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest(
        ".form-card,.payment-card,.person,.album,.donation-visual",
      );
      if (!card || document.body.classList.contains("paused")) return;
      const r = card.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
    });
    document.addEventListener("pointerout", (e) => {
      const card = e.target.closest(
        ".form-card,.payment-card,.person,.album,.donation-visual",
      );
      if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
    });
  }
})();
