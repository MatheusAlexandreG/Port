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

$(document).ready(function () {
    $(".header-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        items: 1,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });
});


const section = document.querySelector(".full-width-container");
const image = document.querySelector(".image-container img");

// Função para mover a imagem com o efeito 3D
function handleMouseMove(e) {
    const { left, top, width, height } = section.getBoundingClientRect();

    // Verifica se o mouse está dentro da section
    if (e.clientX < left || e.clientX > left + width || e.clientY < top || e.clientY > top + height) {
        resetEffect(); // Se estiver fora, reseta o efeito
        return;
    }

    // Calcula a posição relativa do mouse dentro da section
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    // Aplica a transformação 3D
    const rotateX = y * -30;
    const rotateY = x * 30;

    image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
}

// Função para resetar o efeito
function resetEffect() {
    image.style.transform = "rotateX(0) rotateY(0) scale(1)";
}

// Adiciona eventos somente na section
section.addEventListener("mousemove", handleMouseMove);
section.addEventListener("mouseleave", resetEffect);



(function () {
    "use strict";

    const carousel = document.querySelector(".carousel");
    const slider = carousel.querySelector(".carousel__slider");
    const items = carousel.querySelectorAll(".carousel__slider__item");
    const prevBtn = carousel.querySelector(".carousel__prev");
    const nextBtn = carousel.querySelector(".carousel__next");

    let width, height, totalWidth, margin = 20;
    let currIndex = 0;
    let interval;
    const intervalTime = 4000;

    function init() {
      resize();
      move(Math.floor(items.length / 2));
      bindEvents();
      startAutoPlay();
    }

    function resize() {
      width = Math.max(window.innerWidth * 0.25, 275);
      height = window.innerHeight * 0.5;
      totalWidth = width * items.length;

      slider.style.width = `${totalWidth}px`;

      items.forEach(item => {
        item.style.width = `${width - margin * 2}px`;
        item.style.height = `${height}px`;
      });
    }

    function move(index) {
        if (index < 1) index = items.length;
        if (index > items.length) index = 1;
        currIndex = index;

        for (var i = 0; i < items.length; i++) {
            let item = items[i],
                box = item.getElementsByClassName('item__3d-frame')[0];

            if (i == (index - 1)) {
                item.classList.add('carousel__slider__item--active');
                box.style.transform = "perspective(1200px)";
            } else {
                item.classList.remove('carousel__slider__item--active');
                box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
            }
        }

        // 🛠️ Corrigindo a centralização do primeiro item
        let adjustment = index === 1 ? width / 2 : 0;  // Ajusta a posição inicial
        slider.style.transform = "translate3d(" + ((index * -width) + adjustment + (window.innerWidth / 2)) + "px, 0, 0)";
    }


    function startAutoPlay() {
      stopAutoPlay();
      interval = setInterval(() => move(++currIndex), intervalTime);
    }

    function stopAutoPlay() {
      clearInterval(interval);
    }

    function prev() {
      move(--currIndex);
      startAutoPlay();
    }

    function next() {
      move(++currIndex);
      startAutoPlay();
    }

    function bindEvents() {
      window.addEventListener("resize", resize);
      prevBtn.addEventListener("click", prev);
      nextBtn.addEventListener("click", next);
    }

    init();
  })();
