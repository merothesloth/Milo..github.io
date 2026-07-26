/* =====================================
   PORTFOLIO EDITOR
   PART 1 FIX
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


const editButton =
document.getElementById("editButton");


let editMode = false;



if(!editButton){

    console.log("Edit button not found");

    return;

}



editButton.addEventListener(
"click",
()=>{


    editMode = !editMode;



    document.body.classList.toggle(
        "editing",
        editMode
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


});
