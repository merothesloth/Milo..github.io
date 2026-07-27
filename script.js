/* =========================================================
   PORTFOLIO V3
   SCRIPT.JS
   COMPLETE CLEAN VERSION
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


/* =====================================================
   ELEMENTS
===================================================== */


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



let detailOpen = false;



/* =====================================================
   OPEN ARTWORK
===================================================== */


function openArtwork(piece){


    detailOpen = true;


    const img =
    piece.querySelector("img");


    const title =
    piece.querySelector("h2");


    const description =
    piece.querySelector("p");



    if(detailImage && img){

        detailImage.src = img.src;

    }



    if(detailTitle && title){

        detailTitle.textContent =
        title.textContent;

    }



    if(detailText && description){

        detailText.textContent =
        description.textContent;

    }



    if(detailPage){

        detailPage.classList.add("active");

    }


    document.body.classList.add(
        "detail-open"
    );


}




/* =====================================================
   CLOSE ARTWORK
===================================================== */


function closeArtwork(){


    detailOpen = false;


    if(detailPage){

        detailPage.classList.remove("active");

    }


    document.body.classList.remove(
        "detail-open"
    );


}





/* =====================================================
   ARTWORK CLICK
===================================================== */


artworks.forEach((piece)=>{


    piece.addEventListener(
        "click",
        ()=>{


            openArtwork(piece);


        }
    );


});






/* =====================================================
   BACK BUTTON
===================================================== */


if(backButton){


    backButton.addEventListener(
        "click",
        ()=>{


            closeArtwork();


        }
    );


}





/* =====================================================
   ESCAPE KEY
===================================================== */


document.addEventListener(
"keydown",
(event)=>{


    if(
        event.key === "Escape" &&
        detailOpen
    ){

        closeArtwork();

        return;

    }



    if(detailOpen) return;



    if(!gallery) return;



    const distance = 400;



    if(
        event.key === "ArrowRight"
    ){

        gallery.scrollBy({

            left:distance,

            behavior:"smooth"

        });

    }



    if(
        event.key === "ArrowLeft"
    ){

        gallery.scrollBy({

            left:-distance,

            behavior:"smooth"

        });

    }


});






/* =====================================================
   NATIVE TRACKPAD SCROLL
===================================================== */


if(gallery){


    gallery.addEventListener(
        "wheel",
        (event)=>{


            if(detailOpen) return;



            /*
              Let Mac trackpad
              horizontal gestures
              behave naturally.
            */


            if(
                Math.abs(event.deltaX) >
                Math.abs(event.deltaY)
            ){

                return;

            }



            /*
              Convert normal mouse wheel
              into horizontal movement.
            */


            event.preventDefault();



            gallery.scrollLeft +=
            event.deltaY;



        },
        {
            passive:false
        }
    );


}







/* =====================================================
   DRAG SCROLLING
===================================================== */


let dragging = false;

let startX = 0;

let startScroll = 0;



if(gallery){



gallery.addEventListener(
"mousedown",
(event)=>{


    dragging = true;


    startX =
    event.pageX;


    startScroll =
    gallery.scrollLeft;


    gallery.classList.add(
        "dragging"
    );


});





gallery.addEventListener(
"mousemove",
(event)=>{


    if(!dragging) return;


    const move =
    event.pageX - startX;



    gallery.scrollLeft =
    startScroll - move;



});






window.addEventListener(
"mouseup",
()=>{


    dragging=false;


    gallery.classList.remove(
        "dragging"
    );


});



}






/* =====================================================
   HOVER EFFECT
===================================================== */


artworks.forEach((piece)=>{


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







/* =====================================================
   PREVENT IMAGE DRAG
===================================================== */


document.querySelectorAll(
"img"
)
.forEach((img)=>{


    img.addEventListener(
        "dragstart",
        (event)=>{

            event.preventDefault();

        }
    );


});






console.log(
"Portfolio script loaded correctly"
);



});
