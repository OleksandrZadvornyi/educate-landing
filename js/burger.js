let headerMenu = document.getElementsByTagName("nav")[0];
let burger = document.getElementById("menu__toggle");

burger.addEventListener("change", function () {
    if (this.checked) {
        headerMenu.style.right = 0;
    } else {
        headerMenu.style.right = "-100%";
    }
});