/**
 * aftercareTabs.js
 * Prebacuje između "Tattoo aftercare" i "Piercing aftercare" panela
 * (jednostavan pristupačan tab pattern: role="tablist"/"tab"/"tabpanel")
 * i uz to mijenja fotografiju proizvoda u .aftercare__media.
 */

export function initAftercareTabs() {
  const tabsWrap = document.querySelector("[data-aftercare-tabs]");
  if (!tabsWrap) return;

  const tabs = Array.from(tabsWrap.querySelectorAll("[data-aftercare-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-aftercare-panel]"));
  const mediaImgs = Array.from(document.querySelectorAll("[data-aftercare-media]"));

  const activate = (name) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.aftercareTab === name;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.aftercarePanel !== name;
    });

    mediaImgs.forEach((img) => {
      img.hidden = img.dataset.aftercareMedia !== name;
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.aftercareTab));
  });
}
