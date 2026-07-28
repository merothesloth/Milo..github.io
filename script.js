/* ======================================================
   PORTFOLIO V4
   SCRIPT.JS
   PART 1 OF 3
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

/* ======================================================
   ELEMENTS
====================================================== */

const gallery = document.querySelector("#gallery");

const artworks = document.querySelectorAll(".artPiece");

const detailPage = document.querySelector("#detailPage");

const detailImage = document.querySelector("#detailImage");

const detailTitle = document.querySelector("#detailTitle");

const detailText = document.querySelector("#detailText");

const backButton = document.querySelector("#backButton");

let artworkOpen = false;

/* ======================================================
   OPEN ARTWORK
====================================================== */

function openArtwork(piece){

    artworkOpen = true;

    const img = piece.querySelector("img");
    const title = piece.querySelector("h2");
    const text = piece.querySelector("p");

    detailImage.src = img.src;
    detailImage.alt = img.alt;

    detailTitle.textContent = title.textContent;
    detailText.textContent = text.textContent;

    detailPage.style.display = "block";

    requestAnimationFrame(() => {

        detailPage.classList.add("active");

    });

}

/* ======================================================
   CLOSE ARTWORK
====================================================== */

function closeArtwork(){

    artworkOpen = false;

    detailPage.classList.remove("active");

    setTimeout(() => {

        detailPage.style.display = "none";

    },450);

}

/* ======================================================
   CLICK TO OPEN
====================================================== */

artworks.forEach(piece => {

    piece.addEventListener("click", () => {

        openArtwork(piece);

    });

});/* ======================================================
   KEYBOARD CONTROLS
====================================================== */

backButton.addEventListener("click", closeArtwork);

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && artworkOpen) {

        closeArtwork();
        return;

    }

    if (artworkOpen) return;

    if (event.key === "ArrowRight") {

        gallery.scrollBy({

            left: 420,

            behavior: "smooth"

        });

    }

    if (event.key === "ArrowLeft") {

        gallery.scrollBy({

            left: -420,

            behavior: "smooth"

        });

    }

});


/* ======================================================
   TRACKPAD & MOUSE WHEEL
====================================================== */

gallery.addEventListener("wheel", (event) => {

    if (artworkOpen) return;

    /*
       Allow natural horizontal trackpad scrolling.
       Only convert a normal mouse wheel's vertical
       movement into horizontal scrolling.
    */

    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {

        return;

    }

    event.preventDefault();

    gallery.scrollLeft += event.deltaY;

}, {

    passive: false

});


/* ======================================================
   DRAG SCROLL
====================================================== */

let dragging = false;

let startX = 0;

let startScroll = 0;

let moved = false;


gallery.addEventListener("mousedown", (event) => {

    if (artworkOpen) return;

    dragging = true;

    moved = false;

    startX = event.pageX;

    startScroll = gallery.scrollLeft;

    gallery.classList.add("dragging");

});


window.addEventListener("mousemove", (event) => {

    if (!dragging) return;

    const distance = event.pageX - startX;

    if (Math.abs(distance) > 5) {

        moved = true;

    }

    gallery.scrollLeft = startScroll - distance;

});


window.addEventListener("mouseup", () => {

    dragging = false;

    gallery.classList.remove("dragging");

});


/* ======================================================
   PREVENT CLICK AFTER DRAG
====================================================== */

artworks.forEach(piece => {

    piece.addEventListener("click", (event) => {

        if (moved) {

            event.preventDefault();

            event.stopImmediatePropagation();

            moved = false;

        }

    }, true);

});/* ======================================================
   HOVER EFFECTS
====================================================== */

artworks.forEach(piece => {

    piece.addEventListener("mouseenter", () => {

        if (artworkOpen) return;

        artworks.forEach(other => {

            if (other !== piece) {

                other.classList.add("dimmed");

            }

        });

        piece.classList.add("hovered");

    });



    piece.addEventListener("mouseleave", () => {

        artworks.forEach(other => {

            other.classList.remove("dimmed");

            other.classList.remove("hovered");

        });

    });

});


/* ======================================================
   KEEP DETAIL PAGE SCROLL AT TOP
====================================================== */

function resetDetailScroll(){

    const rightColumn =
    document.querySelector("#rightColumn");

    if(rightColumn){

        rightColumn.scrollTop = 0;

    }

}



/* ======================================================
   UPDATE OPEN / CLOSE
====================================================== */

const originalOpenArtwork =
openArtwork;

openArtwork = function(piece){

    resetDetailScroll();

    originalOpenArtwork(piece);

};



/* ======================================================
   WINDOW RESIZE
====================================================== */

window.addEventListener("resize",()=>{

    gallery.classList.remove("dragging");

});



/* ======================================================
   PRELOAD ARTWORKS
====================================================== */

artworks.forEach(piece=>{

    const img =
    piece.querySelector("img");

    if(img){

        const preload =
        new Image();

        preload.src =
        img.src;

    }

});



/* ======================================================
   INTRO FADE (OPTIONAL)
====================================================== */

const intro =
document.querySelector("#intro");

if(intro){

    intro.animate(

        [

            {

                opacity:0,

                transform:"translate(-50%, -12px)"

            },

            {

                opacity:1,

                transform:"translate(-50%, 0)"

            }

        ],

        {

            duration:700,

            easing:"ease-out",

            fill:"forwards"

        }

    );

}



/* ======================================================
   READY
====================================================== */

console.log(

"Portfolio V4 Loaded"

);

});
