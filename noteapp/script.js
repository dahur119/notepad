const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p")
closeIconBtn = popupBox.querySelector("header i"),
titleInput = popupBox.querySelector("input")
descTag = popupBox.querySelector("textarea")
addNoteBtn = popupBox.querySelector("button");

const months  = ["January","February", "March", "April", "May", "June", "July", "August","September","October","November", "December"]
// getting localstorage notres if exist and parsing them to js else passing an empty arr
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId ;


addBox.addEventListener('click', ()=>{
    titleInput.focus()
    popupBox.classList.add("show") 
})



closeIconBtn.addEventListener("click", ()=>{
    isUpdate = false;
    titleInput.value = "";
    descTag.value = "";
    
    popupBox.classList.remove("show")

})

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note , index)=>{
        let lisTag = `<li class="note">
                <div class="details">
                    <p>${note.title}</p>
                    <span>${note.description}</span>
                </div>
                <div class="bottom-content">
                    <span>${note.date}</span>
                    <div class="settings">
                        <i onclick= "showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="menu">
                            <li onclick = "updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen" ></i>Edit </li>
                            <li onclick= "deleteNote(${index})"><i class="uil uil-trash" ></i>Delete </li>
                        </ul>
                    </div>
                </div>
            </li>`;
        addBox.insertAdjacentHTML("afterend", lisTag)

    });
}
showNotes()

function showMenu(elem){
   elem.parentElement.classList.add("show")
   document.addEventListener("click", (e)=>{
       if(e.target.tagName != "I" || e.target != elem){
           elem.parentElement.classList.remove("show")

       }
   })
}

function updateNote(noteId, title, description){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleInput.value = title;
    descTag.value = description;
    popupTitle.innerText ="Update a New Note"
    addNoteBtn.innerText = "Update Note"

    console.log(noteId, title, description)

}
function deleteNote(noteId){
    let confirmid = confirm("Are you sure you want to delete?")
    if(!confirmid) return
    notes.splice(noteId, 1);// removing selected element

    localStorage.setItem("notes", JSON.stringify(notes)); // updating 
    showNotes();

}

addNoteBtn.addEventListener("click", e =>{
    e.preventDefault()
    let inputTitle = titleInput.value;
    let descTagArea = descTag.value;
    if(inputTitle || descTagArea){
        let dateObj = new Date(),  // get the monthe and the date 
        month =months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title:inputTitle, description:descTagArea,
            date: `${month} ${day} ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo)
        }else{
            isUpdate = false;
            notes[updateId] = noteInfo
        }

        
         // add note to notes 

        // adding it to localstorage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIconBtn.click();
        showNotes();
        
    }
})

