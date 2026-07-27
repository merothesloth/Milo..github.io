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


const heroTitle =
document.querySelector("#heroTitle");


const heroSubtitle =
document.querySelector("#heroSubtitle");



let opened=false;





/* ======================================================
   TYPEWRITER
====================================================== */


function typeWriter(element,speed){


if(!element)return;


const text =
element.textContent;


element.textContent="";


element.classList.add(
"typewriter"
);



const colors=[

"#ff1744",
"#ff6d00",
"#ffd600",
"#00e676",
"#00b0ff",
"#651fff",
"#d500f9",
"#ff4081"

];



let color =
colors[
Math.floor(
Math.random()*colors.length
)
];



element.style.setProperty(
"--cursor-color",
color
);



let index=0;



const timer=setInterval(()=>{


element.textContent +=
text[index];


index++;



if(index>=text.length){


clearInterval(timer);



setTimeout(()=>{


let changeCount=0;



const colorTimer=setInterval(()=>{


color =
colors[
Math.floor(
Math.random()*colors.length
)
];



element.style.setProperty(
"--cursor-color",
color
);



changeCount++;



if(changeCount>=6){


clearInterval(colorTimer);


element.classList.add(
"finished"
);


}



},700);



},4000);



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

detailPage.classList.add(
"active"
);

},20);


}





function closeArtwork(){


opened=false;


detailPage.classList.remove(
"active"
);


setTimeout(()=>{


detailPage.style.display="none";


},400);


}







/* CLICK */

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
closeArtwork
);






/* ESCAPE + ARROWS */


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







/* TRACKPAD */

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







/* DRAG */

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







/* HOVER */


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
"Portfolio loaded"
);


});
