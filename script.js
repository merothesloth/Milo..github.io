const galleryPage = document.getElementById("galleryPage");
const gallery = document.getElementById("gallery");
const artPieces = Array.from(document.querySelectorAll(".artPiece"));

const detailPage = document.getElementById("detailPage");
const backButton = document.getElementById("backButton");
const detailImage = document.getElementById("detailImage");
const detailTitle = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");

let hoveredPiece = null;
let detailOpen = false;

let isDragging = false;
let dragStartX = 0;
let dragStartScrollLeft = 0;
let didDrag = false;
let activePointerId = null;

artPieces.forEach((imgPiece) => {
  const img = imgPiece.querySelector("img");
  if (img) img.draggable = false;
});

function clearHover() {
  if (detailOpen) return;
  hoveredPiece = null;
  artPieces.forEach((piece) => {
    piece.classList.remove("hovered", "dimmed");
  });
}

function setHover(piece) {
  if (detailOpen || isDragging) return;
  hoveredPiece = piece;

  artPieces.forEach((other) => {
    const isHovered = other === piece;
    other.classList.toggle("hovered", isHovered);
    other.classList.toggle("dimmed", !isHovered);
  });
}

function openDetail(piece) {
  const img = piece.querySelector("img");
  const title = piece.querySelector("h2");
  const desc = piece.querySelector("p");

  detailImage.src = img.src;
  detailImage.alt = img.alt || title.textContent || "Artwork";
  detailTitle.textContent = title.textContent;
  detailDescription.textContent = desc.textContent;

  detailOpen = true;
  galleryPage.style.display = "none";
  detailPage.style.display = "block";
  detailPage.setAttribute("aria-hidden", "false");
  clearHover();
}

function closeDetail() {
  detailOpen = false;
  detailPage.style.display = "none";
  detailPage.setAttribute("aria-hidden", "true");
  galleryPage.style.display = "block";
  clearHover();
}

artPieces.forEach((piece) => {
  piece.addEventListener("mouseenter", () => setHover(piece));
  piece.addEventListener("mouseleave", () => {
    if (hoveredPiece === piece) clearHover();
  });

  piece.addEventListener("click", () => {
    if (didDrag) return;
    openDetail(piece);
  });
});

gallery.addEventListener("mouseleave", clearHover);
backButton.addEventListener("click", closeDetail);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && detailOpen) {
    closeDetail();
  }
});

/* Horizontal mouse-wheel scrolling */
gallery.addEventListener(
  "wheel",
  (e) => {
    if (detailOpen) return;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      gallery.scrollLeft += e.deltaY;
    }
  },
  { passive: false }
);

/* Drag to scroll horizontally */
gallery.addEventListener("pointerdown", (e) => {
  if (detailOpen) return;

  isDragging = true;
  didDrag = false;
  activePointerId = e.pointerId;
  dragStartX = e.clientX;
  dragStartScrollLeft = gallery.scrollLeft;
  gallery.classList.add("dragging");

  try {
    gallery.setPointerCapture(activePointerId);
  } catch (err) {}
});

gallery.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  const dx = e.clientX - dragStartX;

  if (Math.abs(dx) > 5) {
    didDrag = true;
  }

  gallery.scrollLeft = dragStartScrollLeft - dx;
  e.preventDefault();
});

function endDrag() {
  if (!isDragging) return;

  isDragging = false;
  activePointerId = null;
  gallery.classList.remove("dragging");

  setTimeout(() => {
    didDrag = false;
  }, 0);
}

gallery.addEventListener("pointerup", endDrag);
gallery.addEventListener("pointercancel", endDrag);
gallery.addEventListener("lostpointercapture", endDrag);
