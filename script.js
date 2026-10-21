/* ======================================================
   PART 1 OF 3 — START OF SCRIPT.JS
   Copy this first, then paste Parts 2 and 3 directly
   after it in the SAME file.
====================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector("#gallery");
    const artworks = Array.from(document.querySelectorAll(".artPiece"));
    const detailPage = document.querySelector("#detailPage");
    const detailImage = document.querySelector("#detailImage");
    const detailTitle = document.querySelector("#detailTitle");
    const detailText = document.querySelector("#detailText");
    const rightColumn = document.querySelector("#rightColumn");
    const introGif = document.querySelector("#introGif");
    const intro = document.querySelector("#intro");

    let artworkOpen = false;
    let inspectionOverlay = null;
    let closeArtworkTimer = null;

    const DETAIL_EXTENSIONS = [
        "jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG"
    ];
    const MAX_DETAIL_IMAGES = 50;

    /* --------------------------------------------------
       IMAGE INSPECTION OVERLAY
    -------------------------------------------------- */
    function closeInspection() {
        if (!inspectionOverlay) return;
        inspectionOverlay.remove();
        inspectionOverlay = null;
    }

    function openInspection(image) {
        if (!image || !image.src || inspectionOverlay) return;

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
        enlargedImage.src = image.currentSrc || image.src;
        enlargedImage.alt = image.alt || "Enlarged artwork detail";

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

        inspectionOverlay.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            closeInspection();
        });

        document.body.appendChild(inspectionOverlay);
    }

    /* --------------------------------------------------
       DETAIL IMAGE LOADING
       Example filenames:
       images/art1-detail1.jpg
       images/art1-detail2.png
       images/art2-detail1.webp
    -------------------------------------------------- */
    function addDetailImage(artworkNumber, imageNumber) {
        const artboard = document.createElement("div");
        artboard.className = "artboard";

        const image = document.createElement("img");
        image.alt = `Artwork ${artworkNumber} detail ${imageNumber}`;
        image.loading = "eager";
        image.decoding = "async";

        const candidates = DETAIL_EXTENSIONS.map(extension =>
            `images/art${artworkNumber}-detail${imageNumber}.${extension}`
        );

        let candidateIndex = 0;
        let finished = false;

        image.addEventListener("error", () => {
            if (finished) return;

            candidateIndex += 1;

            if (candidateIndex < candidates.length) {
                image.src = candidates[candidateIndex];
            } else {
                finished = true;
                artboard.remove();

                console.info(
                    `No file found for artwork ${artworkNumber}, detail ${imageNumber}. Tried: ${candidates.join(", ")}`
                );
            }
        });

        image.addEventListener("load", () => {
            finished = true;
            artboard.dataset.loaded = "true";
        });

        image.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            openInspection(image);
        });

        artboard.appendChild(image);
        rightColumn.appendChild(artboard);
        image.src = candidates[candidateIndex];
    }    /* --------------------------------------------------
       OPEN AN ARTWORK
    -------------------------------------------------- */
    function openArtwork(piece) {
        if (!piece || !detailPage || !detailImage ||
            !detailTitle || !detailText || !rightColumn) {
            console.error("A required detail-page element is missing.");
            return;
        }

        const classList = Array.from(piece.classList);
        const artworkClass = classList.find(className =>
            /^art\d+$/.test(className)
        );

        if (!artworkClass) {
            console.error("Could not identify this artwork:", piece);
            return;
        }

        const artworkNumber = artworkClass.replace("art", "");
        const image = piece.querySelector("img");
        const title = piece.querySelector("h2");
        const description = piece.querySelector("p");

        if (closeArtworkTimer) {
            clearTimeout(closeArtworkTimer);
            closeArtworkTimer = null;
        }

        closeInspection();

        artworkOpen = true;
        document.body.classList.add("detail-open");

        detailTitle.textContent = title ? title.textContent : "";
        detailText.textContent = description ? description.textContent : "";

        if (image) {
            detailImage.src = image.currentSrc || image.src;
            detailImage.alt = image.alt || title?.textContent || "Artwork";
        }

        detailPage.classList.add("active");
        detailPage.setAttribute("aria-hidden", "false");

        /* Clear previous detail images. */
        rightColumn.replaceChildren();

        /* Reset scrolling to the top. */
        rightColumn.scrollTop = 0;
        rightColumn.scrollLeft = 0;

        /* Load detail images until the available filenames end. */
        for (let i = 1; i <= MAX_DETAIL_IMAGES; i++) {
            addDetailImage(artworkNumber, i);
        }

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }

    /* --------------------------------------------------
       CLOSE AN ARTWORK
    -------------------------------------------------- */
    function closeArtwork() {
        if (!detailPage) return;

        artworkOpen = false;
        closeInspection();

        detailPage.classList.remove("active");
        detailPage.setAttribute("aria-hidden", "true");
        document.body.classList.remove("detail-open");

        if (rightColumn) {
            rightColumn.replaceChildren();
            rightColumn.scrollTop = 0;
        }

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }

    /* --------------------------------------------------
       HOMEPAGE ARTWORK CLICK HANDLERS
    -------------------------------------------------- */
    artworks.forEach(piece => {
        piece.addEventListener("click", event => {
            if (dragMoved) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }

            openArtwork(piece);
        });
    });

    /* --------------------------------------------------
       BACK BUTTON — INTRO GIF
    -------------------------------------------------- */
    if (introGif) {
        introGif.style.cursor = "pointer";

        introGif.addEventListener("click", event => {
            event.preventDefault();
            closeArtwork();
        });
    }

    /* --------------------------------------------------
       KEYBOARD CONTROLS
    -------------------------------------------------- */
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            if (inspectionOverlay) {
                closeInspection();
            } else if (artworkOpen) {
                closeArtwork();
            }
        }

        if (artworkOpen) return;

        if (gallery && event.key === "ArrowRight") {
            gallery.scrollBy({
                left: 250,
                behavior: "smooth"
            });
        }

        if (gallery && event.key === "ArrowLeft") {
            gallery.scrollBy({
                left: -250,
                behavior: "smooth"
            });
        }
    });    /* --------------------------------------------------
       HOMEPAGE HOVER EFFECTS
    -------------------------------------------------- */
    artworks.forEach(piece => {
        piece.addEventListener("mouseenter", () => {
            if (artworkOpen) return;

            artworks.forEach(otherPiece => {
                if (otherPiece !== piece) {
                    otherPiece.classList.add("dimmed");
                }
            });

            piece.classList.add("focused");
        });

        piece.addEventListener("mouseleave", () => {
            artworks.forEach(otherPiece => {
                otherPiece.classList.remove("dimmed");
                otherPiece.classList.remove("focused");
            });
        });
    });

    /* --------------------------------------------------
       HORIZONTAL GALLERY SCROLLING
    -------------------------------------------------- */
    if (gallery) {
        gallery.addEventListener("wheel", event => {
            if (artworkOpen) return;

            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
                gallery.scrollLeft += event.deltaY;
                event.preventDefault();
            }
        }, { passive: false });
    }

    /* --------------------------------------------------
       CLICK-AND-DRAG GALLERY SCROLLING
    -------------------------------------------------- */
    let isDragging = false;
    let dragStartX = 0;
    let startingScrollLeft = 0;
    let dragMoved = false;

    if (gallery) {
        gallery.addEventListener("pointerdown", event => {
            if (artworkOpen || event.button !== 0) return;

            isDragging = true;
            dragMoved = false;
            dragStartX = event.clientX;
            startingScrollLeft = gallery.scrollLeft;
        });

        gallery.addEventListener("pointermove", event => {
            if (!isDragging || artworkOpen) return;

            const distance = event.clientX - dragStartX;

            if (Math.abs(distance) > 5) {
                dragMoved = true;
            }

            if (dragMoved) {
                gallery.scrollLeft = startingScrollLeft - distance;
            }
        });

        const stopDragging = () => {
            if (!isDragging) return;

            isDragging = false;

            /*
             * Keep dragMoved true until the click generated by
             * the drag has been handled.
             */
            if (dragMoved) {
                requestAnimationFrame(() => {
                    dragMoved = false;
                });
            }
        };

        gallery.addEventListener("pointerup", stopDragging);
        gallery.addEventListener("pointercancel", stopDragging);
        window.addEventListener("pointerup", stopDragging);

        gallery.addEventListener("click", event => {
            if (dragMoved) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }, true);

        gallery.addEventListener("dragstart", event => {
            event.preventDefault();
        });
    }

    /* --------------------------------------------------
       INTRO GIF FADE-IN
    -------------------------------------------------- */
    if (introGif) {
        introGif.addEventListener("load", () => {
            introGif.classList.add("loaded");
        });

        if (introGif.complete && introGif.naturalWidth > 0) {
            introGif.classList.add("loaded");
        }
    }

    /* --------------------------------------------------
       INITIAL PAGE STATE
    -------------------------------------------------- */
    if (detailPage) {
        detailPage.classList.remove("active");
        detailPage.setAttribute("aria-hidden", "true");
    }

    document.body.classList.remove("detail-open");

    console.log("Portfolio script initialized successfully.");
});
