/* =====================================
   PORTFOLIO EDITOR
   PART 4 - SAVING
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





textElements.forEach((element,index)=>{


    if(editMode){


        element.contentEditable = true;


        element.classList.add(
            "editableText"
        );



        element.addEventListener(
            "input",
            ()=>{


                saveText(
                    index,
                    element.innerText
                );


            }
        );


    }


});





movableElements.forEach((element,index)=>{


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



loadSavedChanges();



}







function startDragging(event){


if(!editMode)return;


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



savePosition(
element,
element.offsetLeft,
element.offsetTop
);



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







function savePosition(element,x,y){


let data =
JSON.parse(
localStorage.getItem("positions")
)
||
{};



let id =
element.dataset.editorId;



if(!id){

id =
Math.random()
.toString(36)
.substring(2);


element.dataset.editorId=id;

}



data[id]={
x:x,
y:y
};



localStorage.setItem(
"positions",
JSON.stringify(data)
);



}







function saveText(id,text){


let data =
JSON.parse(
localStorage.getItem("texts")
)
||
{};



data[id]=text;



localStorage.setItem(
"texts",
JSON.stringify(data)
);



}







function loadSavedChanges(){


let positions =
JSON.parse(
localStorage.getItem("positions")
)
||
{};



document
.querySelectorAll(
".draggable"
)
.forEach(element=>{


let id =
element.dataset.editorId;



if(positions[id]){


element.style.position="fixed";


element.style.left =
positions[id].x+"px";


element.style.top =
positions[id].y+"px";


}



});



let texts =
JSON.parse(
localStorage.getItem("texts")
)
||
{};



document
.querySelectorAll(
"h1,h2,h3,p"
)
.forEach((element,index)=>{


if(texts[index]){


element.innerText =
texts[index];


}


});



}
