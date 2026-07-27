/* ======================================================
   PORTFOLIO V3
   SCRIPT.JS
   PART 3A
====================================================== */

const galleryPage = document.getElementById("galleryPage");
const detailPage = document.getElementById("detailPage");

const gallery = document.getElementById("gallery");

const artPieces = document.querySelectorAll(".artPiece");

const backButton = document.getElementById("backButton");

const detailImage = document.getElementById("detailImage");
const detailTitle = document.getElementById("detailTitle");
const detailText = document.getElementById("detailText");

let detailOpen = false;



/* =====================================
   HOVER EFFECT
===================================== */

artPieces.forEach((piece) => {

    piece.addEventListener("mouseenter", () => {

        if (detailOpen) return;

        artPieces.forEach((other) => {

            if (other === piece) {

                other.classList.add("hovered");
                other.classList.remove("dimmed");

            } else {

                other.classList.remove("hovered");
                other.classList.add("dimmed");

            }

        });

    });

    piece.addEventListener("mouseleave", () => {

        if (detailOpen) return;

        artPieces.forEach((other) => {

            other.classList.remove("hovered");
            other.classList.remove("dimmed");

        });

    });

});



/* =====================================
   OPEN DETAIL PAGE
===================================== */

artPieces.forEach((piece) => {

    piece.addEventListener("click", () => {

        const img = piece.querySelector("img");
        const title = piece.querySelector("h2");
        const text = piece.querySelector("p");

        detailImage.src = img.src;
        detailTitle.textContent = title.textContent;
        detailText.textContent = text.textContent;

        galleryPage.classList.add("hidden");

        setTimeout(() => {

            galleryPage.style.display = "none";

            detailPage.style.display = "block";

            requestAnimationFrame(() => {
                detailPage.classList.add("active");
            });

            detailOpen = true;

        }, 450);

    });

});



/* =====================================
   CLOSE DETAIL PAGE
===================================== */

backButton.addEventListener("click", () => {

    detailPage.classList.remove("active");

    setTimeout(() => {

        detailPage.style.display = "none";

        galleryPage.style.display = "block";

        requestAnimationFrame(() => {
            galleryPage.classList.remove("hidden");
        });

        detailOpen = false;

    }, 450);

});



/* =====================================
   ESC KEY
===================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && detailOpen) {

        backButton.click();

    }

});



/* =====================================
   HORIZONTAL SCROLL
===================================== */

gallery.addEventListener("wheel", (event) => {

    event.preventDefault();

    gallery.scrollLeft += event.deltaY;

}, { passive: false });/* ======================================================
   PORTFOLIO V3
   SCRIPT.JS
   PART 3B
   DRAG SCROLL + POLISH
====================================================== */

let isDragging = false;
let dragStartX = 0;
let dragStartScroll = 0;
let moved = false;

/* Disable image dragging */

document.querySelectorAll(".artPiece img").forEach((img) => {

    img.draggable = false;

});

/* Mouse Down */

gallery.addEventListener("mousedown", (event) => {

    if (detailOpen) return;

    isDragging = true;

    moved = false;

    dragStartX = event.pageX;

    dragStartScroll = gallery.scrollLeft;

    gallery.style.cursor = "grabbing";

});

/* Mouse Move */

window.addEventListener("mousemove", (event) => {

    if (!isDragging) return;

    const distance = event.pageX - dragStartX;

    if (Math.abs(distance) > 4) {

        moved = true;

    }

    gallery.scrollLeft = dragStartScroll - distance;

});

/* Mouse Up */

window.addEventListener("mouseup", () => {

    isDragging = false;

    gallery.style.cursor = "grab";

});

/* Prevent clicks after dragging */

artPieces.forEach((piece) => {

    piece.addEventListener("click", (event) => {

        if (moved) {

            event.stopImmediatePropagation();

            event.preventDefault();

            moved = false;

        }

    }, true);

});

/* Keyboard Navigation */

document.addEventListener("keydown", (event) => {

    if (detailOpen) return;

    if (event.key === "ArrowRight") {

        gallery.scrollBy({

            left: 450,

            behavior: "smooth"

        });

    }

    if (event.key === "ArrowLeft") {

        gallery.scrollBy({

            left: -450,

            behavior: "smooth"

        });

    }

});

/* Keep cursor correct */

gallery.addEventListener("mouseleave", () => {

    isDragging = false;

    gallery.style.cursor = "grab";

});

/* Prevent selecting text while dragging */

gallery.addEventListener("dragstart", (event) => {

    event.preventDefault();

});

/* Give gallery focus */

gallery.tabIndex = 0;

/* Smooth initial position */

window.addEventListener("load", () => {

    gallery.scrollTo({

        left: 0,

        behavior: "instant"

    });

});
