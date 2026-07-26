/* =====================================
   PORTFOLIO EDITOR
   PART 3 - DRAGGING
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


const editButton =
document.getElementById("editButton");


let editMode = false;



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


    const moveElements =
    document.querySelectorAll(
        ".artPiece, img, .artboard"
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




    moveElements.forEach(element=>{


        if(editMode){


            element.classList.add(
                "draggable"
            );


            element.addEventListener(
                "mousedown",
                dragStart
            );


        }


        else{


            element.classList.remove(
                "draggable"
            );


        }


    });



}







function dragStart(event){


if(!editMode) return;


const element =
event.currentTarget;



let startX =
event.clientX;


let startY =
event.clientY;



let originalX =
element.offsetLeft;


let originalY =
element.offsetTop;



function dragMove(e){


element.style.position =
"relative";



element.style.left =
originalX +
(e.clientX - startX)
+
"px";



element.style.top =
originalY +
(e.clientY - startY)
+
"px";



}



function dragEnd(){


document.removeEventListener(
"mousemove",
dragMove
);


document.removeEventListener(
"mouseup",
dragEnd
);



}




document.addEventListener(
"mousemove",
dragMove
);



document.addEventListener(
"mouseup",
dragEnd
);



}



});
