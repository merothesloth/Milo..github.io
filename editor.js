/* =====================================
   PORTFOLIO VISUAL EDITOR
   VERSION 1
===================================== */


let editMode = false;
let selectedObject = null;
let history = [];



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


    setupEditor();


});





function setupEditor(){


const objects =
document.querySelectorAll(
".artPiece, .artPiece img, .artboard, h1, h2, h3, p"
);



objects.forEach(object=>{


    if(editMode){


        object.classList.add(
            "editableObject"
        );


        object.addEventListener(
            "mousedown",
            selectObject
        );


        if(
        object.tagName === "H1" ||
        object.tagName === "H2" ||
        object.tagName === "H3" ||
        object.tagName === "P"
        ){

            object.contentEditable = true;

        }


    }


    else{


        object.classList.remove(
            "editableObject"
        );


        object.contentEditable = false;


    }



});



}







function selectObject(e){


if(!editMode)return;


e.preventDefault();


selectedObject =
e.currentTarget;



document
.querySelectorAll(
".selectedObject"
)
.forEach(item=>{

item.classList.remove(
"selectedObject"
);

});



selectedObject.classList.add(
"selectedObject"
);



makeDraggable(
selectedObject
);



}







function makeDraggable(element){


let startX;
let startY;


let startLeft;
let startTop;



element.onmousedown =
function(e){


startX =
e.clientX;


startY =
e.clientY;



const rect =
element.getBoundingClientRect();



startLeft =
rect.left;


startTop =
rect.top;



function move(event){


element.style.position =
"fixed";



element.style.left =
startLeft +
(event.clientX-startX)
+
"px";



element.style.top =
startTop +
(event.clientY-startY)
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



};


}






/* TEXT CONTROLS */


function changeTextSize(size){

if(selectedObject){

selectedObject.style.fontSize =
size + "px";

}

}



function changeTextColor(color){

if(selectedObject){

selectedObject.style.color =
color;

}

}
