/* ======================================================
   PORTFOLIO V3
   COMPLETE SCRIPT.JS
====================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


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

const backButton =
document.querySelector("#backButton");



/* ======================================================
   FIRST VISIT TYPEWRITER
====================================================== */


const heroTitle =
document.querySelector("#heroTitle");


const heroSubtitle =
document.querySelector("#heroSubtitle");



function typeWriter(element, speed){

    if(!element) return;


    const text =
    element.textContent;


    element.textContent="";


    element.classList.add(
        "typewriter"
    );


    let index=0;


    const typing =
    setInterval(()=>{


        element.textContent +=
        text[index];


        index++;


        if(index >= text.length){


            clearInterval(typing);


            setTimeout(()=>{


                element.classList.remove(
                    "typewriter"
                );


            },1000);


        }


    },speed);


}



const visited =
localStorage.getItem(
"portfolioVisited"
);



if(!visited){


    typeWriter(
        heroTitle,
        90
    );


    setTimeout(()=>{


        typeWriter(
            heroSubtitle,
            50
        );


    },2000);



    localStorage.setItem(
        "portfolioVisited",
        "true"
    );


}

let opened=false;





/* ======================================================
   OPEN ARTWORK
====================================================== */


function openArtwork(piece){


opened=true;


const img =
piece.querySelector("img");


const title =
piece.querySelector("h2");


const text =
piece.querySelector("p");



detailImage.src =
img.src;


detailTitle.textContent =
title.textContent;


detailText.textContent =
text.textContent;



detailPage.style.display="block";


setTimeout(()=>{

detailPage.classList.add("active");

},10);


}




/* CLOSE */


function closeArtwork(){


opened=false;


detailPage.classList.remove(
"active"
);


setTimeout(()=>{


detailPage.style.display="none";


},400);



}




/* CLICK ARTWORK */


artworks.forEach(
(piece)=>{


piece.addEventListener(
"click",
()=>{


openArtwork(piece);


});


});






/* BACK */


backButton.addEventListener(
"click",
()=>{


closeArtwork();


});






/* ESCAPE */


document.addEventListener(
"keydown",
(e)=>{


if(
e.key==="Escape" &&
opened
){

closeArtwork();

return;

}



if(opened)return;



if(e.key==="ArrowRight"){

gallery.scrollBy({

left:400,

behavior:"smooth"

});

}



if(e.key==="ArrowLeft"){

gallery.scrollBy({

left:-400,

behavior:"smooth"

});

}



});






/* ======================================================
   TRACKPAD + WHEEL
====================================================== */


gallery.addEventListener(
"wheel",
(e)=>{


if(opened)return;



if(
Math.abs(e.deltaX) >
Math.abs(e.deltaY)
){

return;

}



e.preventDefault();


gallery.scrollLeft += e.deltaY;



},
{
passive:false
}

);






/* ======================================================
   DRAG SCROLL
====================================================== */


let down=false;

let start=0;

let scroll=0;



gallery.addEventListener(
"mousedown",
(e)=>{


down=true;


start=e.pageX;


scroll=gallery.scrollLeft;


gallery.classList.add(
"dragging"
);


});




window.addEventListener(
"mousemove",
(e)=>{


if(!down)return;


gallery.scrollLeft =
scroll -
(e.pageX-start);


});




window.addEventListener(
"mouseup",
()=>{


down=false;


gallery.classList.remove(
"dragging"
);


});







/* ======================================================
   HOVER
====================================================== */


artworks.forEach(
(piece)=>{


piece.addEventListener(
"mouseenter",
()=>{


artworks.forEach(
(other)=>{


if(other!==piece)

other.classList.add(
"dimmed"
);


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
"Portfolio ready"
);


});
