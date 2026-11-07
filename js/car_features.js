console.log("car features js loaded");

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const carType = params.get("type");

    const carSections = document.querySelectorAll(".cars-section");

    carSections.forEach(section => {

        if (section.dataset.type === carType) {
            section.classList.remove("hidden");
        }
        else {
            section.classList.add("hidden");
        }

    });

});