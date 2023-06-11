const openModalBtn = document.querySelector("#playtrailer");
const modal = document.querySelector(".modal");
const closeIcon = document.querySelectorAll(".modal .close");
openModalBtn.addEventListener("click", function () {
    modal.classList.add("active");
});
closeIcon.forEach((element) => {
    element.addEventListener("click", function () {
        modal.classList.remove("active");
    });
});
modal.addEventListener("click", function (e) {
    if (e.target == e.currentTarget) {
        modal.classList.remove("active");
    }
});
