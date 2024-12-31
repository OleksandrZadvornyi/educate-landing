const languageButton = document.querySelector(".current-language");
const dropdown = document.querySelector(".language-dropdown");
const currentFlag = document.getElementById("current-flag");

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
    localStorage.setItem("lang", selectedLang);
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
