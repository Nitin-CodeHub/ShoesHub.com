const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const panel = document.getElementById("sidePanel");

openBtn.addEventListener("click", () => {
  panel.classList.add("open");
  panel.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", closePanel);

window.addEventListener("click", (e) => {
  if (!panel.classList.contains("open")) return;
  // if clicked outside the panel (and not the hamburger)
  if (!panel.contains(e.target) && e.target !== openBtn) closePanel();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && panel.classList.contains("open")) closePanel();
});

function closePanel() {
  panel.classList.remove("open");
  panel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
window.addEventListener("resize", () => {
  if (window.innerWidth >= 769 && panel.classList.contains("open"))
    closePanel();
});