
/* ======================================================
   PORTFOLIO V5 — COMPLETE SCRIPT.JS
   Homepage gallery preserved
   Detail image inspection rebuilt
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ELEMENTS */
    const gallery = document.querySelector("#gallery");
    const artworks = document.querySelectorAll(".artPiece");
    const detailPage = document.querySelector("#detailPage");
    const detailImage = document.querySelector("#detailImage");
    const detailTitle = document.querySelector("#detailTitle");
    const detailText = document.querySelector("#detailText");
    const rightColumn = document.querySelector("#rightColumn");
    const introGif = document.querySelector("#introGif");
    const intro = document.querySelector("#intro");

    let artworkOpen = false;
    let inspectionOverlay = null;

    /* ==================================================
       CLOSE ENLARGED IMAGE
    ================================================== */

    function closeInspection() {
        if (!inspectionOverlay) return;

        inspectionOverlay.remove();
        inspectionOverlay = null;
    }

    /* ==================================================
       OPEN ENLARGED IMAGE
       Original gallery image stays in place.
       Overlay is outside the detail layout, so the
       backdrop blurs without blurring the enlarged image.
    ================================================== */

    function openInspection(image) {
        if (inspectionOverlay) return;

        inspectionOverlay = document.createElement("div");
        inspectionOverlay.id = "imageInspection";

        Object.assign(inspectionOverlay.style, {
            position: "fixed",
            inset: "0",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4vh 4vw",
            boxSizing: "border-box",
            background: "rgba(0, 0, 0, 0.18)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            zIndex: "99999",
            cursor: "zoom-out"
        });

        const enlargedImage = document.createElement("img");

        enlargedImage.src = image.src;
        enlargedImage.alt = image.alt;

        Object.assign(enlargedImage.style, {
            display: "block",
            width: "auto",
            height: "auto",
            maxWidth: "92vw",
            maxHeight: "92vh",
            objectFit: "contain",
            filter: "none",
            transform: "none",
            position: "relative",
            zIndex: "100000",
            cursor: "zoom-out"
        });

        inspectionOverlay.appendChild(enlargedImage);

        // Clicking anywhere closes the inspection only.
        inspectionOverlay.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            closeInspection();
        });

        // Prevent the overlay from opening another image.
        document.body.appendChild(inspectionOverlay);
    }

    /* ==================================================
       OPEN ARTWORK DETAIL PAGE
    ================================================== */

    function openArtwork(piece) {
        closeInspection();

        artworkOpen = true;

        const img = piece.querySelector("img");
        const title = piece.querySelector("h2");
        const description = piece.querySelector("p");

        if (!img || !title || !description) return;

        detailImage.src = img.src;
        detailImage.alt = img.alt;
        detailTitle.textContent = title.textContent;
        detailText.textContent = description.textContent;

        // Build the secondary image gallery.
        rightColumn.innerHTML = "";

        const artworkClass = Array.from(piece.classList)
            .find(className => /^art\d+$/.test(className));

        if (artworkClass) {
            const artworkNumber = artworkClass.replace("art", "");

            for (let i = 1; i <= 50; i++) {
                const detailImagePath =
                    `images/art${artworkNumber}-detail${i}.jpg`;

                const artboard = document.createElement("div");
                artboard.className = "artboard";

                const detailImg = document.createElement("img");
                detailImg.src = detailImagePath;
                detailImg.alt =
                    `Artwork ${artworkNumber} detail ${i}`;
                detailImg.loading = "lazy";

                // Remove image slots for files that don't exist.
                detailImg.addEventListener("error", () => {
                    artboard.remove();
                }, { once: true });

                // Inspect this image without moving it or stacking it.
                detailImg.addEventListener("click", (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    openInspection(detailImg);
                });

                artboard.appendChild(detailImg);
                rightColumn.appendChild(artboard);
            }
        }

        // Start each detail page at the top.
        rightColumn.scrollTop = 0;
        detailPage.scrollTop = 0;

        detailPage.style.display = "block";

        requestAnimationFrame(() => {
            detailPage.classList.add("active");
        });
    }

    /* ==================================================
       CLOSE ARTWORK DETAIL PAGE
    ================================================== */

    function closeArtwork() {
        closeInspection();

        artworkOpen = false;
        detailPage.classList.remove("active");

        setTimeout(() => {
            if (!artworkOpen) {
                detailPage.style.display = "none";
            }
        }, 450);
    }

    /* ==================================================
       GIF BACK BUTTON
    ================================================== */

    if (introGif) {
        introGif.addEventListener("click", () => {
            if (artworkOpen) {
                closeArtwork();
            }
        });
    }

    /* ==================================================
       CLICK HOMEPAGE ARTWORKS TO OPEN
    ================================================== */

    artworks.forEach(piece => {
        piece.addEventListener("click", () => {
            openArtwork(piece);
        });
    });

    /* ==================================================
       KEYBOARD CONTROLS
    ================================================== */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (inspectionOverlay) {
                closeInspection();
                return;
            }

            if (artworkOpen) {
                closeArtwork();
                return;
            }
        }

        if (artworkOpen || !gallery) return;

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

    /* ==================================================
       MOUSE WHEEL / TRACKPAD SCROLL
    ================================================== */

    if (gallery) {
        gallery.addEventListener("wheel", (event) => {
            if (artworkOpen) return;

            // Keep natural horizontal trackpad scrolling.
            if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
                return;
            }

            event.preventDefault();
            gallery.scrollLeft += event.deltaY;
        }, { passive: false });
    }

    /* ==================================================
       CLICK-AND-DRAG HOMEPAGE SCROLL
    ================================================== */

    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    if (gallery) {
        gallery.addEventListener("mousedown", (event) => {
            if (artworkOpen || event.button !== 0) return;

            // Do not start a gallery drag on interactive content.
            if (event.target.closest("a, button")) return;

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

        // Prevent opening artwork when the user was dragging.
        artworks.forEach(piece => {
            piece.addEventListener("click", (event) => {
                if (!moved) return;

                event.preventDefault();
                event.stopImmediatePropagation();
                moved = false;
            }, true);
        });
    }

    /* ==================================================
       HOMEPAGE HOVER EFFECTS
    ================================================== */

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

    /* ==================================================
       WINDOW RESIZE
    ================================================== */

    window.addEventListener("resize", () => {
        if (gallery) {
            gallery.classList.remove("dragging");
        }

        dragging = false;
    });

    /* ==================================================
       PRELOAD HOMEPAGE ARTWORKS
    ================================================== */

    artworks.forEach(piece => {
        const img = piece.querySelector("img");

        if (img) {
            const preload = new Image();
            preload.src = img.src;
        }
    });

    /* ==================================================
       INTRO FADE
    ================================================== */

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

    console.log("Portfolio V5 Loaded");
});
