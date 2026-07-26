/* =====================================
   ART PORTFOLIO
   PART 3A - SCRIPT.JS
===================================== */


/* =========================
   SELECT ELEMENTS
========================= */


const artworks = document.querySelectorAll(".artPiece");

const galleryPage = document.getElementById("galleryPage");

const detailPage = document.getElementById("detailPage");

const backButton = document.getElementById("backButton");

const detailImage = document.getElementById("detailImage");

const detailTitle = document.getElementById("detailTitle");

const detailDescription = document.getElementById("detailDescription");




/* =========================
   HOVER SETTINGS
========================= */


const shrinkAmount = 0.85;

const growAmount = 1.05;

const blurAmount = "5px";

const darkAmount = "brightness(0.85)";





/* =========================
   RESET ALL ARTWORK
========================= */


function resetArtwork(){


    artworks.forEach(piece=>{


        piece.style.transform = "scale(1)";


        piece.style.filter = "blur(0px) brightness(1)";


        piece.style.opacity = "1";



        const image = piece.querySelector("img");


        image.style.transform = "scale(1)";


        image.style.filter = "blur(0px) brightness(1)";



    });



}






/* =========================
   HOVER EFFECT
========================= */


artworks.forEach(selected=>{


    selected.addEventListener(
        "mouseenter",
        ()=>{


            artworks.forEach(piece=>{


                if(piece !== selected){


                    piece.style.transform =
                    `scale(${shrinkAmount})`;


                    piece.style.filter =
                    `blur(${blurAmount}) ${darkAmount}`;


                    piece.style.opacity =
                    "0.85";



                }


            });



            selected.style.transform =
            `scale(${growAmount})`;



            selected.style.filter =
            "blur(0px) brightness(1)";



            selected.style.opacity =
            "1";



        }

    );


});





/* =========================
   RETURN TO NORMAL
========================= */


galleryPage.addEventListener(
    "mouseleave",
    ()=>{


        resetArtwork();


    }

);







/* =========================
   OPEN ARTWORK PAGE
========================= */


artworks.forEach(piece=>{


    piece.addEventListener(
        "click",
        ()=>{


            const image =
            piece.querySelector("img");


            const title =
            piece.querySelector("h2");


            const description =
            piece.querySelector("p");



            detailImage.src =
            image.src;



            detailTitle.textContent =
            title.textContent;



            detailDescription.textContent =
            description.textContent;



            galleryPage.style.display =
            "none";



            detailPage.style.display =
            "block";



        }

    );


});







/* =========================
   BACK BUTTON
========================= */


backButton.addEventListener(
    "click",
    ()=>{


        detailPage.style.display =
        "none";



        galleryPage.style.display =
        "block";



        resetArtwork();



    }

);
