/* ======================================================
   PORTFOLIO V4
   SCRIPT.JS
   DETAIL GALLERY VERSION
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

const rightColumn = document.querySelector("#rightColumn");

let artworkOpen = false;


/* ======================================================
   OPEN ARTWORK
====================================================== */

function openArtwork(piece){

    artworkOpen = true;

    const img = piece.querySelector("img");
    const title = piece.querySelector("h2");
    const text = piece.querySelector("p");


    /* ----------------------------------------------
       ORIGINAL LEFT SIDE
    ---------------------------------------------- */

    detailImage.src = img.src;
    detailImage.alt = img.alt;

    detailTitle.textContent = title.textContent;

    detailText.textContent = text.textContent;


    /* ==================================================
       LOAD DETAIL IMAGE GALLERY
    ================================================== */

    if (rightColumn) {

        rightColumn.innerHTML = "";


        const artworkClass =
            Array.from(piece.classList)
                .find(className => /^art\d+$/.test(className));


        if (artworkClass) {

            const artworkNumber =
                artworkClass.replace("art", "");


            /*
               Load:

               art1-detail1.jpg
               art1-detail2.jpg
               art1-detail3.jpg
               etc.
            */

            for (let i = 1; i <= 50; i++) {

                const detailImagePath =
                    `images/art${artworkNumber}-detail${i}.jpg`;


                const artboard =
                    document.createElement("div");

                artboard.className = "artboard";


                const detailImg =
                    document.createElement("img");

                detailImg.src =
                    detailImagePath;

                detailImg.alt =
                    `Artwork ${artworkNumber} detail ${i}`;


                /* --------------------------------------
                   Remove image if it doesn't exist
                -------------------------------------- */

                detailImg.onerror = () => {

                    artboard.remove();

                };


                /* --------------------------------------
                   CLICK DETAIL IMAGE
                -------------------------------------- */

                detailImg.addEventListener("click", (event) => {

                    event.stopPropagation();

                    detailImg.classList.toggle("enlarged");

                });


                artboard.appendChild(detailImg);

                rightColumn.appendChild(artboard);

            }

        }

    }


    /* ==================================================
       OPEN DETAIL PAGE
    ================================================== */

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

    }, 450);

}


/* ======================================================
   GIF BACK BUTTON
====================================================== */

const introGif = document.querySelector("#introGif");

if(introGif){

    introGif.addEventListener("click", closeArtwork);

}


/* ======================================================
   CLICK HOMEPAGE ARTWORK
====================================================== */

artworks.forEach(piece => {

    piece.addEventListener("click", () => {

        openArtwork(piece);

    });

});


/* ======================================================
   CLICK OUTSIDE DETAIL CONTENT
====================================================== */

detailPage.addEventListener("click", (event) => {

    /*
       If a detail image is enlarged,
       clicking anywhere outside it closes
       the enlarged image.
    */

    const enlarged =
        detailPage.querySelector(".artboard img.enlarged");


    if (enlarged) {

        if (event.target !== enlarged) {

            enlarged.classList.remove("enlarged");

        }

        return;

    }

});


/* ======================================================
   KEYBOARD CONTROLS
====================================================== */

document.addEventListener("keydown", (event) => {


    /* ----------------------------------------------
       Escape enlarged detail image first
    ---------------------------------------------- */

    const enlarged =
        detailPage.querySelector(".artboard img.enlarged");


    if (
        event.key === "Escape" &&
        enlarged
    ){

        enlarged.classList.remove("enlarged");

        return;

    }


    /* ----------------------------------------------
       Escape detail page
    ---------------------------------------------- */

    if (
        event.key === "Escape" &&
        artworkOpen
    ){

        closeArtwork();

        return;

    }


    /* ----------------------------------------------
       Original homepage arrow controls
    ---------------------------------------------- */

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


    if (
        Math.abs(event.deltaX) >
        Math.abs(event.deltaY)
    ) {

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


    const distance =
        event.pageX - startX;


    if (Math.abs(distance) > 5) {

        moved = true;

    }


    gallery.scrollLeft =
        startScroll - distance;

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

});


/* ======================================================
   ORIGINAL HOVER EFFECTS
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
   RESET DETAIL SCROLL
====================================================== */

function resetDetailScroll(){

    if(rightColumn){

        rightColumn.scrollTop = 0;

    }

}


/* ======================================================
   OPEN WRAPPER
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

window.addEventListener("resize", () => {

    gallery.classList.remove("dragging");

});


/* ======================================================
   PRELOAD HOMEPAGE ARTWORKS
====================================================== */

artworks.forEach(piece => {

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
   INTRO FADE
====================================================== */

const intro =
    document.querySelector("#intro");


if(intro){

    intro.animate(

        [
            { opacity: 0 },
            { opacity: 1 }
        ],

        {

            duration: 700,

            easing: "ease-out",

            fill: "forwards"

        }

    );

}


/* ======================================================
   READY
====================================================== */

console.log(
    "Portfolio V4 Detail Gallery Loaded"
);

});
