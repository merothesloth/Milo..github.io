
/* =====================================
   PORTFOLIO EDITOR
   PART 1
===================================== */


const editButton =
document.getElementById("editButton");


let editMode = false;



editButton.addEventListener(
"click",
()=>{


    editMode = !editMode;



    document.body.classList.toggle(
        "editing"
    );



    if(editMode){

        editButton.textContent =
        "EXIT EDIT";

    }

    else{

        editButton.textContent =
        "EDIT";

    }



});
