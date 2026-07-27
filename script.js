/* ======================================================
   PORTFOLIO V3
   COMPLETE SCRIPT.JS
====================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


/* ======================================================
   ELEMENTS
====================================================== */


const gallery =
document.querySelector("#gallery");


const artworks =
document.querySelectorAll(".artPiece");


const detailPage =
document.querySelector("#detailPage");


const detailImage =
document.querySelector("#detailImage");


const detailTitle =
document.querySelector("#detailTitle");


const detailText =
document.querySelector("#detailText");


const backButton =
document.querySelector("#backButton");


const heroTitle =
document.querySelector("#heroTitle");


const heroSubtitle =
document.querySelector("#heroSubtitle");



let opened = false;





/* ======================================================
   TYPEWRITER INTRO
====================================================== */


function typeWriter(element, speed){


    if(!element) return;


    const text =
    element.textContent;


    element.textContent="";


    element.classList.add(
        "typewriter"
    );


    let index = 0;



    const timer =
    setInterval(()=>{


        element.textContent +=
        text[index];


        index++;


        if(index >= text.length){


            clearInterval(timer);


            setTimeout(()=>{


                element.classList.remove(
                    "typewriter"
                );


            },700);


        }


    },speed);


}




typeWriter(
    heroTitle,
    90
);



setTimeout(()=>{


    typeWriter(
        heroSubtitle,
        50
    );


},1800);







/* ======================================================
   OPEN ARTWORK
====================================================== */


function openArtwork(piece){


    opened = true;



    const img =
    piece.querySelector("img");


    const title =
    piece.querySelector("h2");


    const description =
    piece.querySelector("p");



    detailImage.src =
    img.src;



    detailTitle.textContent =
    title.textContent;



    detailText.textContent =
    description.textContent;



    detailPage.style.display =
    "block";



    setTimeout(()=>{


        detailPage.classList.add(
            "active"
        );


    },20);


}





/* ======================================================
   CLOSE ARTWORK
====================================================== */


function closeArtwork(){


    opened=false;


    detailPage.classList.remove(
        "active"
    );


    setTimeout(()=>{


        detailPage.style.display =
        "none";


    },400);


}






/* ======================================================
   ARTWORK CLICK EVENTS
====================================================== */


artworks.forEach(
(piece)=>{


    piece.addEventListener(
        "click",
        ()=>{


            openArtwork(piece);


        }
    );


});







/* ======================================================
   BACK BUTTON
====================================================== */


if(backButton){


    backButton.addEventListener(
        "click",
        ()=>{


            closeArtwork();


        }
    );


}







/* ======================================================
   KEYBOARD CONTROLS
====================================================== */


document.addEventListener(
"keydown",
(event)=>{


    if(
        event.key === "Escape" &&
        opened
    ){

        closeArtwork();

        return;

    }



    if(opened) return;



    if(
        event.key === "ArrowRight"
    ){


        gallery.scrollBy({

            left:400,

            behavior:"smooth"

        });


    }




    if(
        event.key === "ArrowLeft"
    ){


        gallery.scrollBy({

            left:-400,

            behavior:"smooth"

        });


    }


});







/* ======================================================
   TRACKPAD / WHEEL SCROLL
====================================================== */


gallery.addEventListener(
"wheel",
(event)=>{


    if(opened) return;



    /*
       Allow real horizontal
       trackpad gestures
    */


    if(
        Math.abs(event.deltaX) >
        Math.abs(event.deltaY)
    ){

        return;

    }



    event.preventDefault();



    gallery.scrollLeft +=
    event.deltaY;



},
{
    passive:false
}

);







/* ======================================================
   MOUSE DRAG SCROLL
====================================================== */


let dragging=false;

let startX=0;

let startScroll=0;



gallery.addEventListener(
"mousedown",
(event)=>{


    dragging=true;


    startX =
    event.pageX;


    startScroll =
    gallery.scrollLeft;


    gallery.classList.add(
        "dragging"
    );


});





window.addEventListener(
"mousemove",
(event)=>{


    if(!dragging) return;



    gallery.scrollLeft =
    startScroll -
    (event.pageX-startX);



});





window.addEventListener(
"mouseup",
()=>{


    dragging=false;


    gallery.classList.remove(
        "dragging"
    );


});








/* ======================================================
   HOVER EFFECT
====================================================== */


artworks.forEach(
(piece)=>{


    piece.addEventListener(
        "mouseenter",
        ()=>{


            artworks.forEach(
            (other)=>{


                if(other !== piece){


                    other.classList.add(
                        "dimmed"
                    );


                }


            });


            piece.classList.add(
                "hovered"
            );


        }
    );





    piece.addEventListener(
        "mouseleave",
        ()=>{


            artworks.forEach(
            (other)=>{


                other.classList.remove(
                    "dimmed"
                );


            });



            piece.classList.remove(
                "hovered"
            );


        }
    );



});







console.log(
"Portfolio loaded successfully"
);



});
