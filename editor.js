/* =====================================
   PORTFOLIO EDITOR
   PART 2 - TEXT EDITING
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


    toggleEditor();



});





function toggleEditor(){


    const allText =
    document.querySelectorAll(
        "h1, h2, h3, p"
    );



    allText.forEach(text=>{


        if(editMode){


            text.setAttribute(
                "contenteditable",
                "true"
            );


            text.classList.add(
                "editableText"
            );


        }

        else{


            text.removeAttribute(
                "contenteditable"
            );


            text.classList.remove(
                "editableText"
            );


        }


    });



}



});
