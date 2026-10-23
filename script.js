/* ======================================================
   PORTFOLIO — COMPLETE SCRIPT.JS
   Preserves homepage gallery behavior and improves the
   detail-image loader to try common image extensions.
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
    let typingTimer = null;
    let detailWorkDescription = null;

    /* Add a separate description area beneath the main artwork text. */
    const leftColumn = document.querySelector("#leftColumn");
    if (leftColumn && detailText) {
        detailWorkDescription = document.createElement("p");
        detailWorkDescription.id = "detailWorkDescription";
        detailWorkDescription.setAttribute("aria-live", "polite");
        detailWorkDescription.setAttribute("aria-atomic", "true");
        detailWorkDescription.hidden = true;
        leftColumn.appendChild(detailWorkDescription);
    }

    function typeDetailDescription(text) {
        if (!detailWorkDescription) return;

        if (typingTimer !== null) {
            clearTimeout(typingTimer);
            typingTimer = null;
        }

        detailWorkDescription.textContent = "";
        detailWorkDescription.hidden = false;
        detailWorkDescription.classList.add("typing");
        detailWorkDescription.classList.remove("has-description");

        if (!text) {
            detailWorkDescription.hidden = true;
            detailWorkDescription.classList.remove("typing");
            return;
        }

        let characterIndex = 0;
        const typingSpeed = 24;

        function typeNextCharacter() {
            detailWorkDescription.textContent = text.slice(0, characterIndex);
            characterIndex += 1;

            if (characterIndex <= text.length) {
                typingTimer = window.setTimeout(typeNextCharacter, typingSpeed);
            } else {
                typingTimer = null;
                detailWorkDescription.classList.remove("typing");
                detailWorkDescription.classList.add("has-description");
            }
        }

        typeNextCharacter();
    }

    const DETAIL_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG"];
    const MAX_DETAIL_IMAGES = 50;

    /*
       WRITE YOUR DETAIL-WORK DESCRIPTIONS HERE.

       The key is "ARTWORK NUMBER-DETAIL IMAGE NUMBER".
       Example: "1-2" describes images/art1-detail2.jpg
       The file extension does not matter.

       Example:
       "1-1": "A close-up of the screen-printed texture.",
       "1-2": "An alternate composition exploring the same theme.",

       Leave a value as "" if that detail has no description.
    */
    const DETAIL_DESCRIPTIONS = {
        "1-1": "flower inspired amazing cool stuff",
        "1-2": "",
        "1-3": "",
        "1-4": "",
        "1-5": "",
        "2-1": "",
        "2-2": "",
        "2-3": "",
        "2-4": "",
        "2-5": "",
        "3-1": "",
        "3-2": "",
        "3-3": "",
        "3-4": "",
        "3-5": "",
        "4-1": "",
        "4-2": "",
        "4-3": "",
        "4-4": "",
        "4-5": "",
        "5-1": "",
        "5-2": "",
        "5-3": "",
        "5-4": "",
        "5-5": "",
        "6-1": "",
        "6-2": "",
        "6-3": "",
        "6-4": "",
        "6-5": "",
        "7-1": "",
        "7-2": "",
        "7-3": "",
        "7-4": "",
        "7-5": "",
        "8-1": "",
        "8-2": "",
        "8-3": "",
        "8-4": "",
        "8-5": ""
    };

    /* --------------------------------------------------
       MASONRY LAYOUT
       The detail page itself scrolls. The board has no
       independent scrolling area or visible scrollbar.
    -------------------------------------------------- */
    function updateMasonryRows() {
        if (!rightColumn) return;

        const styles = window.getComputedStyle(rightColumn);
        const rowHeight = parseFloat(styles.gridAutoRows) || 8;
        const rowGap = parseFloat(styles.rowGap) || 16;
        const rowUnit = rowHeight + rowGap;

        rightColumn.querySelectorAll('.artboard').forEach(artboard => {
            const image = artboard.querySelector('img');
            if (!image || !image.complete || !image.naturalWidth || !image.naturalHeight) {
                artboard.style.gridRowEnd = '';
                return;
            }

            const renderedHeight = image.getBoundingClientRect().height;
            const span = Math.max(1, Math.ceil((renderedHeight + rowGap) / rowUnit));
            artboard.style.gridRowEnd = `span ${span}`;
        });
    }

    let masonryResizeFrame = null;
    function scheduleMasonryUpdate() {
        if (masonryResizeFrame !== null) cancelAnimationFrame(masonryResizeFrame);
        masonryResizeFrame = requestAnimationFrame(() => {
            masonryResizeFrame = null;
            updateMasonryRows();
        });
    }

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
       Expected filename examples:
       images/art1-detail1.jpg
       images/art1-detail2.png
       images/art2-detail1.webp

       Each numbered image tries the common extensions.
       If no matching file exists, only that image slot
       is removed; the rest of the gallery keeps loading.
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
            scheduleMasonryUpdate();
        });

        image.dataset.detailKey = `${artworkNumber}-${imageNumber}`;
        image.tabIndex = 0;
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", `Show description and enlarge artwork ${artworkNumber}, detail ${imageNumber}.`);

        // One click does both things: type the description on the left
        // and immediately open the enlarged image with a blurred backdrop.
        image.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            typeDetailDescription(DETAIL_DESCRIPTIONS[image.dataset.detailKey] || "");
            openInspection(image);
        });

        image.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                typeDetailDescription(DETAIL_DESCRIPTIONS[image.dataset.detailKey] || "");
            }
        });

        artboard.appendChild(image);
        rightColumn.appendChild(artboard);
        image.src = candidates[candidateIndex];
        scheduleMasonryUpdate();
    }

    /* --------------------------------------------------
       OPEN ARTWORK DETAIL PAGE
    -------------------------------------------------- */
    function openArtwork(piece) {
        if (!piece || !detailPage || !detailImage || !detailTitle || !detailText || !rightColumn) {
            console.error("Portfolio detail page is missing one or more required HTML elements.");
            return;
        }

        closeInspection();
        if (closeArtworkTimer) {
            clearTimeout(closeArtworkTimer);
            closeArtworkTimer = null;
        }

        const mainImage = piece.querySelector("img");
        const title = piece.querySelector("h2");
        const description = piece.querySelector("p");
        if (!mainImage || !title || !description) {
            console.error("This artwork needs an image, heading, and description:", piece);
            return;
        }

        const artworkClass = Array.from(piece.classList).find(className => /^art\d+$/.test(className));
        const artworkNumber = artworkClass ? artworkClass.replace("art", "") : null;

        artworkOpen = true;
        detailImage.src = mainImage.currentSrc || mainImage.src;
        detailImage.alt = mainImage.alt || title.textContent;
        detailTitle.textContent = title.textContent;
        detailText.textContent = description.textContent;
        typeDetailDescription("");
        rightColumn.innerHTML = "";

        if (artworkNumber) {
            for (let i = 1; i <= MAX_DETAIL_IMAGES; i += 1) {
                addDetailImage(artworkNumber, i);
            }
        } else {
            console.warn("Couldn't find an artwork class such as 'art1' on:", piece);
        }

        if (rightColumn) rightColumn.scrollTop = 0;
        detailPage.style.display = "block";

        requestAnimationFrame(() => {
            detailPage.classList.add("active");
            scheduleMasonryUpdate();
        });
    }

    /* --------------------------------------------------
       CLOSE ARTWORK DETAIL PAGE
    -------------------------------------------------- */
    function closeArtwork() {
        closeInspection();
        artworkOpen = false;
        if (!detailPage) return;

        detailPage.classList.remove("active");
        if (closeArtworkTimer) clearTimeout(closeArtworkTimer);
        closeArtworkTimer = setTimeout(() => {
            if (!artworkOpen) detailPage.style.display = "none";
            closeArtworkTimer = null;
        }, 450);
    }

    /* --------------------------------------------------
       GIF BACK BUTTON
    -------------------------------------------------- */
    if (introGif) {
        introGif.addEventListener("click", () => {
            if (artworkOpen) closeArtwork();
        });
    }

    /* --------------------------------------------------
       CLICK HOMEPAGE ARTWORKS TO OPEN
    -------------------------------------------------- */
    artworks.forEach(piece => {
        piece.addEventListener("click", () => {
            if (!dragMoved) openArtwork(piece);
        });
    });

    /* --------------------------------------------------
       KEYBOARD CONTROLS
    -------------------------------------------------- */
    document.addEventListener("keydown", event => {
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
        if (event.key === "ArrowRight") gallery.scrollBy({ left: 420, behavior: "smooth" });
        if (event.key === "ArrowLeft") gallery.scrollBy({ left: -420, behavior: "smooth" });
    });

    /* --------------------------------------------------
       MOUSE WHEEL / TRACKPAD HOMEPAGE SCROLL
    -------------------------------------------------- */
    if (gallery) {
        gallery.addEventListener("wheel", event => {
            if (artworkOpen) return;
            if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
            event.preventDefault();
            gallery.scrollLeft += event.deltaY;
        }, { passive: false });
    }

    /* --------------------------------------------------
       CLICK-AND-DRAG HOMEPAGE SCROLL
    -------------------------------------------------- */
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let dragMoved = false;
    let dragMovedTimer = null;

    if (gallery) {
        gallery.addEventListener("mousedown", event => {
            if (artworkOpen || event.button !== 0) return;
            if (event.target.closest("a, button")) return;

            dragging = true;
            dragMoved = false;
            startX = event.pageX;
            startScroll = gallery.scrollLeft;
            gallery.classList.add("dragging");
        });

        window.addEventListener("mousemove", event => {
            if (!dragging) return;
            const distance = event.pageX - startX;
            if (Math.abs(distance) > 5) dragMoved = true;
            gallery.scrollLeft = startScroll - distance;
        });

        window.addEventListener("mouseup", () => {
            if (!dragging) return;
            dragging = false;
            gallery.classList.remove("dragging");

            if (dragMovedTimer) clearTimeout(dragMovedTimer);
            dragMovedTimer = setTimeout(() => {
                dragMoved = false;
                dragMovedTimer = null;
            }, 0);
        });

        gallery.addEventListener("click", event => {
            if (!dragMoved) return;
            event.preventDefault();
            event.stopImmediatePropagation();
            dragMoved = false;
        }, true);
    }

    /* --------------------------------------------------
       HOMEPAGE HOVER EFFECTS
    -------------------------------------------------- */
    artworks.forEach(piece => {
        piece.addEventListener("mouseenter", () => {
            if (artworkOpen) return;
            artworks.forEach(other => {
                if (other !== piece) other.classList.add("dimmed");
            });
            piece.classList.add("hovered");
        });

        piece.addEventListener("mouseleave", () => {
            artworks.forEach(other => {
                other.classList.remove("dimmed", "hovered");
            });
        });
    });

    /* --------------------------------------------------
       WINDOW RESIZE
    -------------------------------------------------- */
    window.addEventListener("resize", () => {
        if (gallery) gallery.classList.remove("dragging");
        dragging = false;
        scheduleMasonryUpdate();
    });

    /* --------------------------------------------------
       PRELOAD HOMEPAGE IMAGES
    -------------------------------------------------- */
    artworks.forEach(piece => {
        const image = piece.querySelector("img");
        if (image) {
            const preload = new Image();
            preload.src = image.src;
        }
    });

    /* --------------------------------------------------
       INTRO FADE
    -------------------------------------------------- */
    if (intro) {
        intro.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            { duration: 700, easing: "ease-out", fill: "forwards" }
        );
    }

    console.log("Portfolio script loaded.");
});
