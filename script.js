const header = document.querySelector(".site-header");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-35% 0px -45% 0px",
    threshold: [0.15, 0.35, 0.6],
  },
);

sections.forEach((section) => observer.observe(section));

const setupProjectShowMore = () => {
  const projectTextBlocks = Array.from(document.querySelectorAll(".project-card p"));

  projectTextBlocks.forEach((textBlock, index) => {
    textBlock.classList.add("project-card__text", "is-collapsed");

    if (textBlock.scrollHeight <= textBlock.clientHeight + 1) {
      textBlock.classList.remove("is-collapsed");
      return;
    }

    const toggleButton = document.createElement("button");
    const textId = textBlock.id || `project-text-${index + 1}`;

    textBlock.id = textId;
    toggleButton.type = "button";
    toggleButton.className = "show-more-button";
    toggleButton.textContent = "Show more";
    toggleButton.setAttribute("aria-controls", textId);
    toggleButton.setAttribute("aria-expanded", "false");

    toggleButton.addEventListener("click", () => {
      const isExpanded = textBlock.classList.toggle("is-expanded");
      toggleButton.textContent = isExpanded ? "Show less" : "Show more";
      toggleButton.setAttribute("aria-expanded", String(isExpanded));
    });

    textBlock.insertAdjacentElement("afterend", toggleButton);
  });
};

setupProjectShowMore();
