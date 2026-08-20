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
   
const rightColumn = document.querySelector("#rightColumn");
   
let artworkOpen = false;

function openArtwork(piece){

    artworkOpen = true;

    const img = piece.querySelector("img");
    const title = piece.querySelector("h2");
    const text = piece.querySelector("p");

    detailImage.src = img.src;
    detailImage.alt = img.alt;

    detailTitle.textContent = title.textContent;
    detailText.textContent = text.textContent;


    /* ==================================================
       LOAD DETAIL IMAGES
    ================================================== */

    if (rightColumn) {

        rightColumn.innerHTML = "";

        /*
           Get the artwork number from the class.

           art1 → 1
           art2 → 2
           art3 → 3
           etc.
        */

        const artworkClass = Array.from(piece.classList)
            .find(className => /^art\d+$/.test(className));

        if (artworkClass) {

            const artworkNumber =
                artworkClass.replace("art", "");

            /*
               Look for detail images:
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

                detailImg.src = detailImagePath;

                detailImg.alt =
                    `Artwork ${artworkNumber} detail ${i}`;

                /*
                   If the JPG doesn't exist,
                   remove the empty artboard.
                */

                detailImg.onerror = () => {

                    artboard.remove();

                };

                /*
                   CLICK DETAIL IMAGE TO ENLARGE
                */

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

    },450);

}

/* ======================================================
   GIF BACK BUTTON
====================================================== */

const introGif = document.querySelector("#introGif");

if(introGif){

    introGif.addEventListener("click", closeArtwork);

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
const intro = document.querySelector("#intro");

if (intro) {

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

"Portfolio V4 Loaded"

);

});
