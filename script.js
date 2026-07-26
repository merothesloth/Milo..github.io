/* ============================================
    ART PORTFOLIO
    PART 3A
============================================ */

const gallery = document.getElementById("gallery");

const pieces = document.querySelectorAll(".piece");

const body = document.body;

/* ============================================
    SETTINGS
============================================ */

const SCALE_UP = 1.05;

const SCALE_DOWN = 0.85;

const BLUR = "4px";

const DARKNESS = 0.85;

/* ============================================
    HOVER EFFECT
============================================ */

function clearPieces(){

    pieces.forEach(piece=>{

        piece.style.transform="scale(1)";

        piece.style.filter="blur(0px) brightness(1)";

        piece.style.opacity="1";

        const image=piece.querySelector("img");

        image.style.transform="scale(1)";

        image.style.filter="blur(0px) brightness(1)";

    });

}

/* ============================================
    APPLY HOVER
============================================ */

pieces.forEach(piece=>{

    piece.addEventListener("mouseenter",()=>{

        pieces.forEach(other=>{

            if(other!==piece){

                other.style.transform=`scale(${SCALE_DOWN})`;

                other.style.filter=`blur(${BLUR}) brightness(${DARKNESS})`;

                other.style.opacity="0.9";

                other.querySelector("img").style.filter=
                    `blur(${BLUR}) brightness(${DARKNESS})`;

            }

        });

        piece.style.transform=`scale(${SCALE_UP})`;

        piece.style.filter="blur(0px) brightness(1)";

        piece.querySelector("img").style.transform="scale(1.03)";

    });

});

/* ============================================
    REMOVE HOVER
============================================ */

gallery.addEventListener("mouseleave",()=>{

    clearPieces();

});

/* ============================================
    DETAIL PAGE
============================================ */

const detail=document.createElement("div");

detail.id="detailPage";

detail.style.display="none";

detail.style.position="fixed";

detail.style.left="0";

detail.style.top="0";

detail.style.width="100vw";

detail.style.height="100vh";

detail.style.background="black";

detail.style.zIndex="999";

detail.style.padding="40px";

detail.innerHTML=`

<button id="backButton">

← Back

</button>

<div id="detailLeft">

<img id="detailImage">

<h2 id="detailTitle"></h2>

<p id="detailText"></p>

</div>

<div id="detailRight">

</div>

`;

body.appendChild(detail);

/* ============================================
    DETAIL REFERENCES
============================================ */

const detailImage=document.getElementById("detailImage");

const detailTitle=document.getElementById("detailTitle");

const detailText=document.getElementById("detailText");

const detailLeft=document.getElementById("detailLeft");

const detailRight=document.getElementById("detailRight");

const backButton=document.getElementById("backButton");

/* ============================================
    OPEN PAGE
============================================ */

pieces.forEach(piece=>{

    piece.addEventListener("click",()=>{

        detail.style.display="flex";

        gallery.style.display="none";

        const image=piece.querySelector("img");

        const title=piece.querySelector("h2");

        const text=piece.querySelector("p");

        detailImage.src=image.src;

        detailTitle.innerHTML=title.innerHTML;

        detailText.innerHTML=text.innerHTML;

    });

});

/* ============================================
    BACK BUTTON
============================================ */

backButton.addEventListener("click",()=>{

    detail.style.display="none";

    gallery.style.display="flex";

});
