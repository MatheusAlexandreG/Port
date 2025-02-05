import './bootstrap';

document.addEventListener("DOMContentLoaded", function () {
    console.log("Vite está funcionando corretamente!");

    // Efeito de Navbar ao rolar a página
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(0, 0, 0, 0.9)";
        } else {
            navbar.style.background = "rgba(0, 0, 0, 0.8)";
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    let isDragging = false, startX, scrollLeft;

    carousel.addEventListener("mousedown", (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("mouseleave", () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    });

    carousel.addEventListener("mouseup", () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    });

    carousel.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });
});
