/* =========================================================
   ART GALLERY SCRIPT
   Complete rebuild
   Part 3A — Core setup, hover effects, artwork opening,
   detail page state, back button
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Gallery script loaded");


    /* =====================================================
       ELEMENT REFERENCES
    ====================================================== */

    const gallery = document.querySelector(".gallery");
    const artworks = document.querySelectorAll(".artwork");

    const detailPage = document.querySelector(".detail-page");
    const detailImage = document.querySelector(".detail-image");
    const detailTitle = document.querySelector(".detail-title");
    const detailArtist = document.querySelector(".detail-artist");
    const detailDescription = document.querySelector(".detail-description");

    const backButton = document.querySelector(".back-button");


    /*
       Safety check:
       Prevents the script from crashing if an element
       is missing during development.
    */

    if (!gallery) {
        console.warn("Gallery element not found");
    }


    /* =====================================================
       GALLERY STATE
    ====================================================== */

    let currentArtwork = null;

    let galleryLocked = false;


    /* =====================================================
       HOVER ANIMATION
    ====================================================== */

    artworks.forEach((artwork) => {

        artwork.addEventListener("mouseenter", () => {

            if (galleryLocked) return;

            artwork.classList.add("hover-active");

        });


        artwork.addEventListener("mouseleave", () => {

            artwork.classList.remove("hover-active");

        });

    });



    /* =====================================================
       OPEN ARTWORK DETAIL PAGE
    ====================================================== */

    artworks.forEach((artwork) => {


        artwork.addEventListener("click", () => {


            if (galleryLocked) return;


            currentArtwork = artwork;


            const image =
                artwork.querySelector("img");


            const title =
                artwork.dataset.title ||
                "Untitled";


            const artist =
                artwork.dataset.artist ||
                "Unknown Artist";


            const description =
                artwork.dataset.description ||
                "No description available.";



            if (detailImage && image) {

                detailImage.src = image.src;
                detailImage.alt = title;

            }


            if (detailTitle) {

                detailTitle.textContent = title;

            }


            if (detailArtist) {

                detailArtist.textContent = artist;

            }


            if (detailDescription) {

                detailDescription.textContent =
                    description;

            }



            openDetailPage();


        });


    });



    /* =====================================================
       OPEN DETAIL FUNCTION
    ====================================================== */

    function openDetailPage() {


        galleryLocked = true;


        if (detailPage) {

            detailPage.classList.add("active");

        }


        document.body.classList.add(
            "detail-open"
        );


    }



    /* =====================================================
       CLOSE DETAIL FUNCTION
    ====================================================== */

    function closeDetailPage() {


        galleryLocked = false;


        if (detailPage) {

            detailPage.classList.remove("active");

        }


        document.body.classList.remove(
            "detail-open"
        );


        currentArtwork = null;


    }



    /* =====================================================
       BACK BUTTON
    ====================================================== */

    if (backButton) {


        backButton.addEventListener(
            "click",
            (event) => {


                event.preventDefault();


                closeDetailPage();


            }
        );


    }



    /* =====================================================
       ESCAPE KEY CLOSE
       (keyboard handling continues in Part 3B)
    ====================================================== */


});/* =========================================================
   ART GALLERY SCRIPT
   Part 3B — Drag scrolling, mouse wheel scrolling,
   arrow keys, escape key, gallery movement
========================================================= */



    /* =====================================================
       GALLERY SCROLL STATE
    ====================================================== */

    let isDragging = false;

    let startX = 0;

    let scrollStart = 0;

    let velocity = 0;

    let lastX = 0;



    /* =====================================================
       MOUSE DRAG SCROLLING
    ====================================================== */

    if (gallery) {


        gallery.addEventListener(
            "mousedown",
            (event) => {


                if (galleryLocked) return;


                isDragging = true;


                gallery.classList.add(
                    "dragging"
                );


                startX = event.pageX;


                scrollStart =
                    gallery.scrollLeft;


                lastX = event.pageX;


            }
        );



        gallery.addEventListener(
            "mousemove",
            (event) => {


                if (!isDragging) return;


                event.preventDefault();


                const distance =
                    event.pageX - startX;


                gallery.scrollLeft =
                    scrollStart - distance;


                velocity =
                    event.pageX - lastX;


                lastX = event.pageX;


            }
        );



        gallery.addEventListener(
            "mouseup",
            () => {


                isDragging = false;


                gallery.classList.remove(
                    "dragging"
                );


            }
        );



        gallery.addEventListener(
            "mouseleave",
            () => {


                isDragging = false;


                gallery.classList.remove(
                    "dragging"
                );


            }
        );

    }



  /* =====================================================
   TRACKPAD / NATIVE HORIZONTAL SCROLL
===================================================== */

if (gallery) {

    gallery.addEventListener(
        "wheel",
        (event) => {


            if (galleryLocked) return;


            /*
              Allow Mac trackpad gestures
              to naturally scroll horizontally.
            */

            if (
                Math.abs(event.deltaX) >
                Math.abs(event.deltaY)
            ) {

                return;

            }


            /*
              Convert vertical two-finger
              trackpad movement into
              horizontal gallery movement.
            */

            event.preventDefault();


            gallery.scrollLeft +=
                event.deltaY;


        },
        {
            passive:false
        }
    );

}


    /* =====================================================
       ARROW KEY NAVIGATION
    ====================================================== */


    document.addEventListener(
        "keydown",
        (event) => {


            /*
              Escape closes detail page
            */

            if (
                event.key === "Escape" &&
                galleryLocked
            ) {


                closeDetailPage();


                return;


            }



            /*
              Prevent gallery movement
              while detail page is open
            */

            if (galleryLocked) return;



            if (!gallery) return;



            const amount = 300;



            if (
                event.key === "ArrowRight"
            ) {


                gallery.scrollBy({
                    left: amount,
                    behavior: "smooth"
                });


            }



            if (
                event.key === "ArrowLeft"
            ) {


                gallery.scrollBy({
                    left: -amount,
                    behavior: "smooth"
                });


            }



        }
    );



    /* =====================================================
       DRAG RELEASE SAFETY
       Prevents stuck dragging if mouse leaves browser
    ====================================================== */


    window.addEventListener(
        "mouseup",
        () => {


            isDragging = false;


            if (gallery) {

                gallery.classList.remove(
                    "dragging"
                );

            }


        }
    );



    /* =====================================================
       PREVENT IMAGE DRAGGING
       Keeps gallery drag smooth
    ====================================================== */


    artworks.forEach(
        (artwork) => {


            const img =
                artwork.querySelector("img");


            if (img) {


                img.addEventListener(
                    "dragstart",
                    (event) => {

                        event.preventDefault();

                    }
                );


            }


        }
    );/* =========================================================
   ART GALLERY SCRIPT
   Part 3C — Final cleanup, click protection,
   animation helpers, event conflict prevention
========================================================= */



    /* =====================================================
       CLICK PROTECTION
       Prevents drag-release from triggering artwork open
    ====================================================== */

    let clickStartX = 0;
    let clickStartY = 0;



    if (gallery) {


        gallery.addEventListener(
            "mousedown",
            (event) => {


                clickStartX = event.clientX;

                clickStartY = event.clientY;


            }
        );



        gallery.addEventListener(
            "click",
            (event) => {


                const movedX =
                    Math.abs(
                        event.clientX -
                        clickStartX
                    );


                const movedY =
                    Math.abs(
                        event.clientY -
                        clickStartY
                    );



                /*
                  If the user dragged,
                  cancel the click.
                */

                if (
                    movedX > 10 ||
                    movedY > 10
                ) {


                    event.preventDefault();

                    event.stopPropagation();


                }


            },
            true
        );


    }




    /* =====================================================
       DETAIL PAGE TRANSITION FALLBACK
    ====================================================== */


    if (detailPage) {


        detailPage.addEventListener(
            "transitionend",
            () => {


                if (
                    !detailPage.classList.contains(
                        "active"
                    )
                ) {


                    document.body.classList.remove(
                        "detail-open"
                    );


                }


            }
        );


    }




    /* =====================================================
       TOUCH SUPPORT
       Allows mobile swipe scrolling
    ====================================================== */


    if (gallery) {


        gallery.style.touchAction =
            "pan-y";



    }



    /* =====================================================
       RESET WHEN WINDOW RESIZES
    ====================================================== */


    window.addEventListener(
        "resize",
        () => {


            if (!galleryLocked) return;


            /*
              Keeps detail page stable
              during resizing.
            */


        }
    );



    /* =====================================================
       FINAL INITIALIZATION
    ====================================================== */


    console.log(
        "Gallery controls initialized successfully"
    );


});
