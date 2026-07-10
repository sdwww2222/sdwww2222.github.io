(function () {
  var setupProjectShowMore = function () {
    var projectTextBlocks = Array.prototype.slice.call(document.querySelectorAll(".project-card p"));

    projectTextBlocks.forEach(function (textBlock, index) {
      if (textBlock.dataset.showMoreReady === "true") {
        return;
      }

      var text = textBlock.textContent.trim();
      var isLongText = text.length > 180 || text.split(/\n+/).length > 4;

      textBlock.classList.add("project-card__text");
      textBlock.dataset.showMoreReady = "true";

      if (!isLongText) {
        return;
      }

      textBlock.classList.add("is-collapsed");

      var toggleButton = document.createElement("button");
      var textId = textBlock.id || "project-text-" + (index + 1);

      textBlock.id = textId;
      toggleButton.type = "button";
      toggleButton.className = "show-more-button";
      toggleButton.textContent = "Show more";
      toggleButton.setAttribute("aria-controls", textId);
      toggleButton.setAttribute("aria-expanded", "false");

      toggleButton.addEventListener("click", function () {
        var isExpanded = textBlock.classList.toggle("is-expanded");

        toggleButton.textContent = isExpanded ? "Show less" : "Show more";
        toggleButton.setAttribute("aria-expanded", String(isExpanded));
      });

      textBlock.insertAdjacentElement("afterend", toggleButton);
    });
  };

  var setupHeader = function () {
    var header = document.querySelector(".site-header");
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
    var year = document.querySelector("#year");

    if (year) {
      year.textContent = new Date().getFullYear();
    }

    var setHeaderState = function () {
      if (header) {
        header.classList.toggle("is-scrolled", window.scrollY > 18);
      }
    };

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });

    if (!("IntersectionObserver" in window)) {
      return;
    }

    var sections = navLinks
      .map(function (link) {
        var target = link.getAttribute("href");

        return target ? document.querySelector(target) : null;
      })
      .filter(Boolean);

    var observer = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          })[0];

        if (!visible) return;

        navLinks.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + visible.target.id);
        });
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  };

  var init = function () {
    setupProjectShowMore();
    setupHeader();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
