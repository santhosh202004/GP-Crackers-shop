/* ==============================
   GP Crackers – Review Slider
   ============================== */

(function () {

  const track    = document.getElementById("reviewsTrack");
  const cards    = document.querySelectorAll(".rev-card");
  const prevBtn  = document.getElementById("revPrev");
  const nextBtn  = document.getElementById("revNext");
  const dotsWrap = document.getElementById("revDots");

  if (!track || cards.length === 0) return;

  /* How many cards are visible at the current breakpoint */
  function visibleCount() {
    if (window.innerWidth <= 575) return 1;
    if (window.innerWidth <= 991) return 2;
    return 3;
  }

  let current    = 0;
  let totalCards = cards.length;
  let autoTimer  = null;

  /* --- Build dot buttons --- */
  function buildDots() {
    dotsWrap.innerHTML = "";
    const pages = Math.ceil(totalCards / visibleCount());
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("button");
      dot.className = "rev-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", () => goTo(i * visibleCount()));
      dotsWrap.appendChild(dot);
    }
  }

  /* --- Update active dot --- */
  function updateDots() {
    const vis   = visibleCount();
    const page  = Math.floor(current / vis);
    const dots  = dotsWrap.querySelectorAll(".rev-dot");
    dots.forEach((d, i) => d.classList.toggle("active", i === page));
  }

  /* --- Move the track --- */
  function goTo(index) {
    const vis     = visibleCount();
    const maxIdx  = totalCards - vis;
    current       = Math.max(0, Math.min(index, maxIdx));

    /* Card width + gap in pixels */
    const cardEl  = cards[0];
    const gap     = 24; /* matches CSS gap: 24px */
    const cardW   = cardEl.getBoundingClientRect().width;
    const offset  = current * (cardW + gap);

    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  /* --- Prev / Next --- */
  function next() { goTo(current + visibleCount()); }
  function prev() { goTo(current - visibleCount()); }

  prevBtn.addEventListener("click", () => { resetAuto(); prev(); });
  nextBtn.addEventListener("click", () => { resetAuto(); next(); });

  /* --- Auto slide every 4s --- */
  function startAuto() {
    autoTimer = setInterval(() => {
      const vis    = visibleCount();
      const maxIdx = totalCards - vis;
      if (current >= maxIdx) {
        goTo(0);
      } else {
        next();
      }
    }, 4000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  /* --- Rebuild on resize (breakpoint change) --- */
  let lastVis = visibleCount();
  window.addEventListener("resize", () => {
    const nowVis = visibleCount();
    if (nowVis !== lastVis) {
      lastVis = nowVis;
      current = 0;
      buildDots();
      goTo(0);
    }
  });

  /* --- Init --- */
  buildDots();
  goTo(0);
  startAuto();

})();