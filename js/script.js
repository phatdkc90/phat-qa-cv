// Nguyen Tan Phat — digital CV interactions
(function () {
  "use strict";

  var nav = document.getElementById("siteNav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  // Close mobile menu after a link is tapped
  if (navLinks) {
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  // Active-section highlight in nav
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("section[id], header[id]")
  );
  var linkMap = {};
  navLinks &&
    navLinks.querySelectorAll("a").forEach(function (a) {
      var id = a.getAttribute("href").replace("#", "");
      linkMap[id] = a;
    });

  var setActive = function (id) {
    Object.keys(linkMap).forEach(function (key) {
      linkMap[key].classList.toggle("active", key === id);
    });
  };

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      navObserver.observe(s);
    });
  }

  // Scroll-reveal (progressive enhancement: elements are visible
  // by default in CSS; only hide-then-reveal if we can guarantee
  // the observer will bring them back)
  var revealEls = document.querySelectorAll(".reveal");
  var prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReduced && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      el.classList.add("pending");
      revealObserver.observe(el);
      // Safety net: if the observer never fires for any reason,
      // don't leave content hidden.
      setTimeout(function () {
        el.classList.add("in");
      }, 4000);
    });
  }

  // Nav background gets a touch more solid once scrolled
  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 12) {
        nav.style.boxShadow = "0 1px 0 rgba(16,36,62,.06)";
      } else {
        nav.style.boxShadow = "none";
      }
    },
    { passive: true }
  );
})();
