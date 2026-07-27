
const galleryPage = document.getElementById("galleryPage");
const gallery = document.getElementById("gallery");
const artPieces = Array.from(document.querySelectorAll(".artPiece"));

const detailPage = document.getElementById("detailPage");
const backButton = document.getElementById("backButton");
const detailImage = document.getElementById("detailImage");
const detailTitle = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");

let hoveredPiece = null;

function clearHover() {
  artPieces.forEach((piece) => {
    piece.classList.remove("hovered", "dimmed");
  });
  hoveredPiece = null;
}

function setHover(piece) {
  hoveredPiece = piece;
  artPieces.forEach((other) => {
    const isHovered = other === piece;
    other.classList.toggle("hovered", isHovered);
    other.classList.toggle("dimmed", !isHovered);
  });
}

artPieces.forEach((piece) => {
  piece.addEventListener("mouseenter", () => setHover(piece));
  piece.addEventListener("mouseleave", () => {
    if (hoveredPiece === piece) clearHover();
  });

  piece.addEventListener("click", () => {
    const img = piece.querySelector("img");
    const title = piece.querySelector("h2");
    const desc = piece.querySelector("p");

    detailImage.src = img.src;
    detailImage.alt = img.alt;
    detailTitle.textContent = title.textContent;
    detailDescription.textContent = desc.textContent;

    galleryPage.style.display = "none";
    detailPage.style.display = "block";
    detailPage.setAttribute("aria-hidden", "false");
    clearHover();
  });
});

gallery.addEventListener("mouseleave", clearHover);

backButton.addEventListener("click", () => {
  detailPage.style.display = "none";
  detailPage.setAttribute("aria-hidden", "true");
  galleryPage.style.display = "block";
  clearHover();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && detailPage.style.display === "block") {
    backButton.click();
  }
});
