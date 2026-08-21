// Keyboard and assistive-technology support for the mobile hamburger (ISS-13).
//
// DoIt ships the control as a <div> with a click handler: not in the tab order,
// deaf to Space and Enter, and silent about whether the menu it opens is open.
// layouts/partials/header.html makes it a real <button>, which settles the first
// two by itself. The two things markup cannot carry are here.
//
// This deliberately does not fork the theme's initMenuMobile. The menu opens and
// closes from three places -- the button, the backdrop mask, and the mobile
// search's cancel button -- and all three go through the same `active` class on
// the toggle. Watching that one class covers all three and keeps covering them
// if the theme grows a fourth; re-implementing the handlers would mean carrying
// a copy of nine hundred lines of theme.ts to keep two of them in sync.
(function () {
  const toggle = document.getElementById("menu-toggle-mobile");
  const menu = document.getElementById("menu-mobile");
  if (!toggle || !menu) return;

  const sync = () =>
    toggle.setAttribute(
      "aria-expanded",
      String(toggle.classList.contains("active")),
    );

  new MutationObserver(sync).observe(toggle, {
    attributes: true,
    attributeFilter: ["class"],
  });
  sync();

  // Escape closes by clicking the button rather than by stripping the classes
  // here, so the body blur and the mask bookkeeping the theme does around the
  // same toggle stay in step. Focus then goes back to the button because the
  // menu it was inside is now display:none, and focus left on a hidden element
  // strands the keyboard back at the top of the document.
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !toggle.classList.contains("active")) return;
    toggle.click();
    toggle.focus();
  });
})();
