/* =====================================
   PORTFOLIO EDITOR
   PART 3 FIX - WORKING DRAGGING
===================================== */


let editMode = false;


const editButton =
document.getElementById("editButton");



editButton.addEventListener(
"click",
()=>{


    editMode = !editMode;


    document.body.classList.toggle(
        "editing",
        editMode
    );


    editButton.textContent =
    editMode ? "EXIT EDIT" : "EDIT";


    activateEditor();


});






function activateEditor(){


const textElements =
document.querySelectorAll(
"h1, h2, h3, p"
);



const movableElements =
document.querySelectorAll(
".artPiece, .artPiece img, .artboard"
);





textElements.forEach(element=>{


    if(editMode){

        element.contentEditable = true;

        element.classList.add(
            "editableText"
        );

    }

    else{

        element.contentEditable = false;

        element.classList.remove(
            "editableText"
        );

    }


});





movableElements.forEach(element=>{


    if(editMode){


        element.classList.add(
            "draggable"
        );


        element.addEventListener(
            "mousedown",
            startDragging
        );


    }



});



}







function startDragging(event){


if(!editMode) return;


event.preventDefault();



const element =
event.currentTarget;



let startX =
event.clientX;


let startY =
event.clientY;



let rect =
element.getBoundingClientRect();



let startLeft =
rect.left;


let startTop =
rect.top;



function move(e){


element.style.position =
"fixed";



element.style.left =
startLeft +
(e.clientX-startX)
+
"px";



element.style.top =
startTop +
(e.clientY-startY)
+
"px";



}





function stop(){


document.removeEventListener(
"mousemove",
move
);


document.removeEventListener(
"mouseup",
stop
);



}



document.addEventListener(
"mousemove",
move
);



document.addEventListener(
"mouseup",
stop
);



}
