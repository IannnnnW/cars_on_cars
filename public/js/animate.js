document.addEventListener("scroll", function() {
    const infoText = document.querySelector(".info-text");
    const rect = infoText.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        infoText.classList.add("scroll-animate");
    }
});