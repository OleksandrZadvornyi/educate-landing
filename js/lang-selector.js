const languageButton = document.querySelector(".current-language");
const dropdown = document.querySelector(".language-dropdown");
const currentFlag = document.getElementById("current-flag");

async function loadTranslations(lang) {
  try {
    const response = await fetch(`../db/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.innerHTML = translations[key];
    });
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}


// Toggle Dropdown Visibility
languageButton.addEventListener("click", () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

// Update Language and Flag
dropdown.addEventListener("click", (event) => {
  const target = event.target.closest("li");
  if (target) {
    const selectedLang = target.getAttribute("data-lang");
    const selectedFlag = target.querySelector("img").src;

    // Update the current flag
    currentFlag.src = selectedFlag;

    // Close the dropdown
    dropdown.style.display = "none";

    // Change language (you can reuse the language loading logic here)
    loadTranslations(selectedLang);
    //localStorage.setItem("lang", selectedLang);
  }
});

// Close Dropdown if Clicked Outside
document.addEventListener("click", (event) => {
  if (
    !languageButton.contains(event.target) &&
    !dropdown.contains(event.target)
  ) {
    dropdown.style.display = "none";
  }
});

// Load a default language (e.g., English) on page load
window.addEventListener("DOMContentLoaded", () => {
  loadTranslations("en");
});