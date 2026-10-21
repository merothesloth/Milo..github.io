/* ======================================================
   PORTFOLIO V4
   DETAIL VIEW ONLY

   HOMEPAGE BEHAVIOR IS PRESERVED.
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       HOMEPAGE ELEMENTS
       These are intentionally left alone.
    ================================================== */

    const gallery = document.querySelector("#gallery");
    const artworks = document.querySelectorAll(".artPiece");

    const introGif = document.querySelector("#introGif");

    /* ==================================================
       DETAIL ELEMENTS
    ================================================== */

    const detailPage = document.querySelector("#detailPage");
    const detailImage = document.querySelector("#detailImage");
    const detailTitle = document.querySelector("#detailTitle");
    const detailText = document.querySelector("#detailText");
    const rightColumn = document.querySelector("#rightColumn");

    let artworkOpen = false;


    /* ==================================================
       OPEN DETAIL VIEW
    ================================================== */

    function openArtwork(piece) {

        artworkOpen = true;

        const img = piece.querySelector("img");
        const title = piece.querySelector("h2");
        const text = piece.querySelector("p");

        /* ----------------------------------------------
           Main selected image
        ---------------------------------------------- */

        if (detailImage && img) {

            detailImage.src = img.src;
            detailImage.alt = img.alt;

        }


        /* ----------------------------------------------
           Description
        ---------------------------------------------- */

        if (detailText && text) {

            detailText.textContent = text.textContent;

        }


        /* ----------------------------------------------
           Title is no longer displayed
        ---------------------------------------------- */

        if (detailTitle) {

            detailTitle.textContent =
                title ? title.textContent : "";

        }


        /* ==================================================
           LOAD DETAIL IMAGES
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
                   Find:

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


                    /*
                       Remove nonexistent detail images.
                    */

                    detailImg.onerror = () => {

                        artboard.remove();

                    };


                    /*
                       Prevent clicking a detail image
                       from closing the overlay.
                    */

                    detailImg.addEventListener("click", (event) => {

                        event.stopPropagation();

                    });


                    artboard.appendChild(detailImg);

                    rightColumn.appendChild(artboard);

                }

            }

        }


        /* ==================================================
           OPEN OVERLAY
        ================================================== */

        detailPage.style.display = "block";

        requestAnimationFrame(() => {

            detailPage.classList.add("active");

        });

    }


    /* ==================================================
       CLOSE DETAIL VIEW
    ================================================== */

    function closeArtwork() {

        if (!artworkOpen) return;

        artworkOpen = false;

        detailPage.classList.remove("active");

        setTimeout(() => {

            if (!artworkOpen) {

                detailPage.style.display = "none";

            }

        }, 450);

    }


    /* ==================================================
       CLICK MAIN HOMEPAGE ARTWORK
    ================================================== */

    artworks.forEach(piece => {

        piece.addEventListener("click", () => {

            openArtwork(piece);

        });

    });


    /* ==================================================
       CLICK OUTSIDE DETAIL IMAGE = CLOSE
    ================================================== */

    detailPage.addEventListener("click", (event) => {

        /*
           If the user clicked the actual selected image,
           don't close.
        */

        if (
            event.target === detailImage ||
            event.target.closest("#detailImage")
        ) {

            return;

        }


        /*
           Clicking the description also does not close.
        */

        if (
            event.target === detailText ||
            event.target.closest("#detailText")
        ) {

            return;

        }


        closeArtwork();

    });


    /* ==================================================
       ESCAPE = CLOSE
    ================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            artworkOpen
        ) {

            closeArtwork();

        }

    });


    /* ==================================================
       GIF
       
       Keep existing behavior.
    ================================================== */

    if (introGif) {

        introGif.addEventListener("click", () => {

            if (artworkOpen) {

                closeArtwork();

            }

        });

    }


    /* ==================================================
       RESET DETAIL SCROLL
    ================================================== */

    function resetDetailScroll() {

        if (rightColumn) {

            rightColumn.scrollTop = 0;

        }

    }


    /* ==================================================
       RESET WHEN OPENING
    ================================================== */

    const originalOpenArtwork =
        openArtwork;

    openArtwork = function(piece) {

        resetDetailScroll();

        originalOpenArtwork(piece);

    };


    /* ==================================================
       PRELOAD HOMEPAGE ARTWORKS
       
       Existing behavior preserved.
    ================================================== */

    artworks.forEach(piece => {

        const img =
            piece.querySelector("img");

        if (img) {

            const preload =
                new Image();

            preload.src =
                img.src;

        }

    });


    /* ==================================================
       INTRO FADE
       
       Existing behavior preserved.
    ================================================== */

    const intro =
        document.querySelector("#intro");

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


    /* ==================================================
       READY
    ================================================== */

    console.log(
        "Portfolio V4 Detail View Loaded"
    );

});
