import en from "../db/en.json";
import fr from "../db/fr.json";
import uk from "../db/uk.json";
import de from "../db/de.json";

const translations = { en, fr, uk, de };

const languageButton = document.querySelector(".current-language");
const dropdown = document.querySelector(".language-dropdown");
const currentFlag = document.getElementById("current-flag");

function setLanguagePreference(language) {
  localStorage.setItem("preferredLanguage", language);
}

function getLanguagePreference() {
  if (localStorage.getItem("preferredLanguage") == null) {
    return "en";
  }
  return localStorage.getItem("preferredLanguage");
}

function updateLanguageSelector(language) {
  const currentFlag = document.getElementById("current-flag");
  currentFlag.src = `https://raw.githubusercontent.com/OleksandrZadvornyi/educate-landing/refs/heads/main/src/images/flags/${language}.png`; // Update the flag icon
}

async function loadTranslations(lang) {
  try {
    const translationData = translations[lang];
    
    if (!translationData) {
      throw new Error(`Translations for language "${lang}" not found`);
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.innerHTML = translationData[key] || el.innerHTML;
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

    // Change language 
    loadTranslations(selectedLang);
    setLanguagePreference(selectedLang);
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
  const preferredLanguage = getLanguagePreference();
  loadTranslations(preferredLanguage);
  if (preferredLanguage !== "en")
    updateLanguageSelector(preferredLanguage);
});