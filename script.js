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

function clearHover() {
  if (detailOpen) return;
  hoveredPiece = null;
  artPieces.forEach((piece) => {
    piece.classList.remove("hovered", "dimmed");
  });
}

function setHover(piece) {
  if (detailOpen) return;
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

  piece.addEventListener("click", () => openDetail(piece));
});

gallery.addEventListener("mouseleave", clearHover);

backButton.addEventListener("click", closeDetail);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && detailOpen) {
    closeDetail();
  }
});

/* Make mouse wheel scroll left/right across the gallery */
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
