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
   TYPEWRITER SYSTEM
====================================================== */


const cursorColors = [

    "#ff1744",
    "#ff6d00",
    "#ffd600",
    "#00e676",
    "#00b0ff",
    "#651fff",
    "#d500f9",
    "#ff4081"

];



function randomCursorColor(){

    return cursorColors[
        Math.floor(
            Math.random() *
            cursorColors.length
        )
    ];

}





function typeWriter(element, speed, keepCursor){


    if(!element) return;



    const text =
    element.textContent;



    element.textContent="";



    element.classList.add(
        "typewriter"
    );



    element.style.setProperty(
        "--cursor-color",
        randomCursorColor()
    );



    let index = 0;



    const timer =
    setInterval(()=>{


        element.textContent +=
        text[index];



        index++;




        if(index >= text.length){



            clearInterval(timer);



            if(!keepCursor){


                element.classList.remove(
                    "typewriter"
                );


                return;


            }




            /*
              Subtitle cursor:
              stays 4 seconds,
              changes every blink
            */



            let changes = 0;



            const colorTimer =
            setInterval(()=>{



                element.style.setProperty(

                    "--cursor-color",

                    randomCursorColor()

                );



                changes++;



                if(changes >= 6){



                    clearInterval(
                        colorTimer
                    );



                    element.classList.add(
                        "finished"
                    );



                }



            },700);



        }



    },speed);


}







/* ======================================================
   START INTRO
====================================================== */


typeWriter(
    heroTitle,
    90,
    false
);



setTimeout(()=>{


    typeWriter(
        heroSubtitle,
        50,
        true
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
   ARTWORK CLICK
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


backButton.addEventListener(
"click",
()=>{


    closeArtwork();


});







/* ======================================================
   KEYBOARD
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



    if(opened)
    return;




    if(event.key === "ArrowRight"){


        gallery.scrollBy({

            left:400,

            behavior:"smooth"

        });


    }




    if(event.key === "ArrowLeft"){


        gallery.scrollBy({

            left:-400,

            behavior:"smooth"

        });


    }



});








/* ======================================================
   TRACKPAD + MOUSE WHEEL
====================================================== */


gallery.addEventListener(
"wheel",
(event)=>{


    if(opened)
    return;



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
   DRAG SCROLL
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


    if(!dragging)
    return;



    gallery.scrollLeft =

    startScroll -

    (event.pageX - startX);



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


    });






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


    });



});







console.log(
"Portfolio loaded successfully"
);



});
