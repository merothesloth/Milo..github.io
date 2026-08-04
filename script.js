/* ======================================================
   PORTFOLIO V5
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

const detailDescription = document.querySelector("#detailDescription");

const backButton = document.querySelector("#backButton");

const introGif = document.querySelector("#intro");



/* ======================================================
   INTRO GIF / FIRST VISIT LOGIC
====================================================== */

const introPlayed = sessionStorage.getItem("introPlayed");

if (!introPlayed) {

    sessionStorage.setItem("introPlayed", "true");

    if (introGif) {

        introGif.classList.add("show");

        setTimeout(() => {
            introGif.classList.add("finished");
        }, 1800);

    }

} else {

    if (introGif) {
        introGif.classList.add("finished");
    }

}



/* ======================================================
   ARTWORK DATA
====================================================== */

const artworkData = [

    {
  {
    image: "images/art1.jpg",
    title: "Artwork One",
    description: "Description for artwork one.",
    details: [
        "images/art1-detail1.jpg"
    ]

    },

    {
        image: "images/art2.jpg",
        title: "Artwork Two",
        description: "Description for artwork two."
    },

    {
        image: "images/art3.jpg",
        title: "Artwork Three",
        description: "Description for artwork three."
    },

    {
        image: "images/art4.jpg",
        title: "Artwork Four",
        description: "Description for artwork four."
    },

    {
        image: "images/art5.jpg",
        title: "Artwork Five",
        description: "Description for artwork five."
    },

    {
        image: "images/art6.jpg",
        title: "Artwork Six",
        description: "Description for artwork six."
    },

    {
        image: "images/art7.jpg",
        title: "Artwork Seven",
        description: "Description for artwork seven."
    },

    {
        image: "images/art8.jpg",
        title: "Artwork Eight",
        description: "Description for artwork eight."
    }

];



/* ======================================================
   OPEN ARTWORK DETAIL PAGE
====================================================== */

function openArtwork(index) {

    const artwork = artworkData[index];

    if (!artwork) return;


    detailImage.src = artwork.image;

    detailTitle.textContent = artwork.title;

    detailDescription.textContent = artwork.description;


    gallery.classList.add("hidden");

    detailPage.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}



/* ======================================================
   CONNECT ARTWORK CLICKS
====================================================== */

artworks.forEach((piece, index) => {

    piece.addEventListener("click", () => {

        openArtwork(index);

    });

});

/* ======================================================
   BACK BUTTON / RETURN TO GALLERY
====================================================== */

function closeArtwork() {

    detailPage.classList.remove("active");

    gallery.classList.remove("hidden");


    // keeps gallery position instead of resetting
    setTimeout(() => {

        gallery.scrollLeft = gallery.dataset.position || 0;

    }, 50);

}



if (backButton) {

    backButton.addEventListener("click", () => {

        closeArtwork();

    });

}



/* ======================================================
   SAVE GALLERY POSITION
====================================================== */

gallery.addEventListener("scroll", () => {

    gallery.dataset.position = gallery.scrollLeft;

});



/* ======================================================
   ESC KEY CLOSE DETAIL PAGE
====================================================== */

document.addEventListener("keydown", (event) => {


    if (event.key === "Escape") {

        if (detailPage.classList.contains("active")) {

            closeArtwork();

        }

    }


});



/* ======================================================
   KEYBOARD GALLERY NAVIGATION
====================================================== */

document.addEventListener("keydown", (event) => {


    if (detailPage.classList.contains("active")) return;


    const scrollAmount = window.innerWidth * 0.65;


    if (event.key === "ArrowRight") {

        gallery.scrollBy({

            left: scrollAmount,

            behavior: "smooth"

        });

    }



    if (event.key === "ArrowLeft") {

        gallery.scrollBy({

            left: -scrollAmount,

            behavior: "smooth"

        });

    }


});



/* ======================================================
   MOUSE WHEEL HORIZONTAL SCROLL
====================================================== */

gallery.addEventListener("wheel", (event) => {


    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {

        event.preventDefault();


        gallery.scrollLeft += event.deltaY;

    }


}, {

    passive:false

});



/* ======================================================
   DRAG TO SCROLL (TRACKPAD / MOUSE)
====================================================== */

let isDragging = false;

let startX;

let startScroll;



gallery.addEventListener("mousedown", (event) => {


    isDragging = true;

    gallery.classList.add("dragging");


    startX = event.pageX;

    startScroll = gallery.scrollLeft;


});



gallery.addEventListener("mouseleave", () => {

    isDragging = false;

    gallery.classList.remove("dragging");

});



gallery.addEventListener("mouseup", () => {

    isDragging = false;

    gallery.classList.remove("dragging");

});



gallery.addEventListener("mousemove", (event) => {


    if (!isDragging) return;


    event.preventDefault();


    const distance = event.pageX - startX;


    gallery.scrollLeft = startScroll - distance;


});



/* ======================================================
   TOUCH DRAG SUPPORT (PHONE)
====================================================== */

let touchStartX = 0;

let touchScrollStart = 0;



gallery.addEventListener("touchstart", (event) => {


    touchStartX = event.touches[0].pageX;

    touchScrollStart = gallery.scrollLeft;


});



gallery.addEventListener("touchmove", (event) => {


    const distance = event.touches[0].pageX - touchStartX;


    gallery.scrollLeft = touchScrollStart - distance;


});
/* ======================================================
   HOVER FOCUS SYSTEM
====================================================== */

artworks.forEach((piece) => {


    piece.addEventListener("mouseenter", () => {


        artworks.forEach((other) => {


            if (other !== piece) {

                other.classList.add("dimmed");

            }


        });


        piece.classList.add("focused");


    });



    piece.addEventListener("mouseleave", () => {


        artworks.forEach((other) => {

            other.classList.remove("dimmed");

            other.classList.remove("focused");

        });


    });


});



/* ======================================================
   PREVENT IMAGE DRAGGING
====================================================== */

const images = document.querySelectorAll("img");


images.forEach((image) => {


    image.addEventListener("dragstart", (event) => {

        event.preventDefault();

    });


});



/* ======================================================
   CENTER CLICKED ARTWORK (OPTIONAL)
====================================================== */

function centerArtwork(piece) {


    const galleryCenter = gallery.offsetWidth / 2;


    const pieceCenter = 
        piece.offsetLeft + piece.offsetWidth / 2;


    const scrollPosition =
        pieceCenter - galleryCenter;


    gallery.scrollTo({

        left: scrollPosition,

        behavior:"smooth"

    });


}



/* ======================================================
   SMOOTH ARTWORK FOCUS
====================================================== */

artworks.forEach((piece) => {


    piece.addEventListener("click", () => {


        centerArtwork(piece);


    });


});



/* ======================================================
   WINDOW RESIZE HANDLING
====================================================== */

window.addEventListener("resize", () => {


    if (detailPage.classList.contains("active")) {

        detailPage.style.height = 
            `${window.innerHeight}px`;

    }


});



/* ======================================================
   INITIAL SETUP
====================================================== */

if (detailPage) {

    detailPage.style.height = 
        `${window.innerHeight}px`;

}



if (gallery) {

    gallery.scrollLeft = 0;

}



/* ======================================================
   PAGE READY
====================================================== */

document.body.classList.add("loaded");



});
