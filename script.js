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

);/* =====================================
   ART PORTFOLIO
   PART 3B - SCRIPT.JS
===================================== */


/* =========================
   TYPEWRITER INTRO
   ONLY FIRST VISIT
========================= */


const introTitle = "My Art Portfolio";

const introText = "A collection of my work.";


function typeWriter(element, text, speed){

    let index = 0;


    element.textContent = "";


    function write(){

        if(index < text.length){

            element.textContent += text.charAt(index);

            index++;

            setTimeout(write, speed);

        }

    }


    write();

}



const titleElement = document.createElement("h1");

const descriptionElement = document.createElement("p");


titleElement.id = "introTitle";

descriptionElement.id = "introDescription";



galleryPage.prepend(descriptionElement);

galleryPage.prepend(titleElement);





if(!localStorage.getItem("visitedPortfolio")){


    typeWriter(
        titleElement,
        introTitle,
        80
    );


    setTimeout(()=>{


        typeWriter(
            descriptionElement,
            introText,
            50
        );


    }, introTitle.length * 80 + 300);



    localStorage.setItem(
        "visitedPortfolio",
        "true"
    );


}

else{


    titleElement.textContent =
    introTitle;


    descriptionElement.textContent =
    introText;


}








/* =========================
   ARTBOARD EXPANSION
========================= */


const artboards =
document.querySelectorAll(".artboard");



artboards.forEach(board=>{


    board.addEventListener(
        "click",
        ()=>{


            board.classList.toggle(
                "expanded"
            );


        }

    );


});







/* =========================
   ESCAPE KEY
   CLOSE DETAIL PAGE
========================= */


document.addEventListener(
    "keydown",
    (event)=>{


        if(event.key === "Escape"){


            if(detailPage.style.display === "block"){


                detailPage.style.display =
                "none";


                galleryPage.style.display =
                "block";


                resetArtwork();


            }


        }


    }

);







/* =========================
   ADD ARTWORK SUPPORT
   FUTURE USE
========================= */


function addArtwork(image,title,description){


    const piece =
    document.createElement("article");


    piece.className =
    "artPiece";



    piece.innerHTML = `

        <img src="${image}">

        <h2>${title}</h2>

        <p>${description}</p>

    `;



    document
    .getElementById("gallery")
    .appendChild(piece);



}







/* =========================
   ADD BOARD SUPPORT
========================= */


function addArtboard(title,text){


    const board =
    document.createElement("div");


    board.className =
    "artboard";


    board.innerHTML = `

        <h2>${title}</h2>

        <p>${text}</p>

    `;



    document
    .getElementById("detailRight")
    .appendChild(board);



}/* =====================================
   ART PORTFOLIO
   PART 4 - EXPANDING ARTBOARDS
===================================== */



/* =========================
   ARTBOARD EXPANSION
========================= */


function setupArtboards(){


    const boards =
    document.querySelectorAll(".artboard");



    boards.forEach(board=>{


        board.addEventListener(
            "click",
            ()=>{


                const alreadyOpen =
                board.classList.contains("expanded");



                boards.forEach(other=>{

                    other.classList.remove(
                        "expanded"
                    );

                });



                if(!alreadyOpen){


                    board.classList.add(
                        "expanded"
                    );


                }


            }

        );


    });


}





setupArtboards();







/* =========================
   CLOSE EXPANDED BOARD
   WITH ESCAPE
========================= */


document.addEventListener(
    "keydown",
    (event)=>{


        if(event.key === "Escape"){


            document
            .querySelectorAll(".artboard")
            .forEach(board=>{


                board.classList.remove(
                    "expanded"
                );


            });


        }


    }

);







/* =========================
   ADD NEW BOARD FUNCTION
========================= */


function createBoard(title, text){


    const board =
    document.createElement("div");


    board.className =
    "artboard";


    board.innerHTML = `

        <h2>${title}</h2>

        <p>${text}</p>

    `;



    document
    .getElementById("detailRight")
    .appendChild(board);



    board.addEventListener(
        "click",
        ()=>{


            board.classList.toggle(
                "expanded"
            );


        }

    );


}
