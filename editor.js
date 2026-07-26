/* =====================================
   PORTFOLIO VISUAL EDITOR
   PART 3
===================================== */


let editing = false;

let selected = null;

let history = [];

let future = [];





const editToggle =
document.getElementById("editToggle");


const canvas =
document.getElementById("canvas");





/* =========================
   EDIT MODE
========================= */


editToggle.onclick = () => {


    editing = !editing;


    document.body.classList.toggle(
        "editing",
        editing
    );


    editToggle.innerText =
    editing ? "EXIT" : "EDIT";



    activateObjects();


};







/* =========================
   SELECT OBJECTS
========================= */


function activateObjects(){


const objects =
document.querySelectorAll(".object");



objects.forEach(object=>{


    object.onclick = (e)=>{


        if(!editing) return;


        e.stopPropagation();


        selectObject(object);


    };


});


}







function selectObject(object){


document
.querySelectorAll(".selected")
.forEach(item=>{


    item.classList.remove(
        "selected"
    );


});



selected = object;


selected.classList.add(
"selected"
);



makeDraggable(selected);



}







/* =========================
   DRAGGING
========================= */


function makeDraggable(element){



element.onmousedown = function(e){


if(!editing) return;



saveState();



let startX =
e.clientX;


let startY =
e.clientY;



let rect =
element.getBoundingClientRect();



let startLeft =
rect.left;



let startTop =
rect.top;





function move(event){


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



saveLayout();


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







/* =========================
   TEXT CONTROLS
========================= */


document
.getElementById("fontSize")
.onclick =
(e)=>{


if(selected){


selected.style.fontSize =
e.target.value+"px";


}


};




document
.getElementById("fontSize")
.onchange =
(e)=>{


if(selected){


saveState();


selected.style.fontSize =
e.target.value+"px";


}


};







document
.getElementById("textColor")
.onchange =
(e)=>{


if(selected){


saveState();


selected.style.color =
e.target.value;


}


};








document
.getElementById("fontSelector")
.onchange =
(e)=>{


if(selected){


saveState();


selected.style.fontFamily =
e.target.value;


}


};







/* =========================
   ADD TEXT
========================= */


document
.getElementById("addText")
.onclick =
()=>{


let box =
document.createElement(
"div"
);



box.className =
"object textObject";



box.style.left =
"100px";


box.style.top =
"100px";



box.innerHTML =
`
<p contenteditable="true">
New Text
</p>
`;



canvas.appendChild(box);



activateObjects();



};







/* =========================
   ADD IMAGE
========================= */


const upload =
document.getElementById(
"imageUpload"
);



document
.getElementById("addImage")
.onclick =
()=>{


upload.click();


};





upload.onchange =
()=>{


let file =
upload.files[0];



if(!file) return;



let reader =
new FileReader();



reader.onload =
function(e){


let box =
document.createElement(
"div"
);



box.className =
"object imageObject";



box.style.left =
"100px";


box.style.top =
"100px";



box.innerHTML =
`
<img src="${e.target.result}">
`;



canvas.appendChild(box);



activateObjects();



};



reader.readAsDataURL(file);



};








/* =========================
   UNDO / REDO
========================= */


function saveState(){


history.push(
canvas.innerHTML
);



future=[];


}





document
.getElementById("undoButton")
.onclick =
()=>{


if(history.length===0)
return;



future.push(
canvas.innerHTML
);



canvas.innerHTML =
history.pop();



activateObjects();



};






document
.getElementById("redoButton")
.onclick =
()=>{


if(future.length===0)
return;



history.push(
canvas.innerHTML
);



canvas.innerHTML =
future.pop();



activateObjects();



};








/* =========================
   SAVE
========================= */


document
.getElementById("saveButton")
.onclick =
()=>{


localStorage.setItem(
"portfolio",
canvas.innerHTML
);



alert(
"Saved"
);



};







function loadLayout(){


let saved =
localStorage.getItem(
"portfolio"
);



if(saved){


canvas.innerHTML =
saved;


}



activateObjects();


}





loadLayout();

activateObjects();
