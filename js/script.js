let dropDownTop = document.querySelector(".dropdown");
let showMoreBtn = document.querySelector(".more_icons");
let addNoteBtn = document.querySelector("#addBtn");
let Editor = document.querySelector(".DownEditor");
let title = document.querySelector(".title");
let description = document.querySelector(".data");
let doneBtn = document.querySelector("#doneBtn");
let deleteAll = document.querySelector("#deleteAll");
let mode = document.querySelector("#mode");


showMoreBtn?.addEventListener("click", function () {
    if (dropDownTop.style.display === "none" ||
        dropDownTop.style.display === ""
    ) {
        dropDownTop.style.display = "block";
    } else {
        dropDownTop.style.display = "none";
    }
});

addNoteBtn?.addEventListener("click", function () {
    Editor.style.display = "block";
});

doneBtn?.addEventListener("click", function () {
    let notes = localStorage.getItem("notes");

    if (notes) {
        notes = JSON.parse(notes);
    } else {
        notes = [];
    }
    notes.push({title: title.value, description: description.value});
    localStorage.setItem("notes", JSON.stringify(notes));
    title.value = "";
    description.value = "";
    Editor.style.display = "none";
    showNotes();
    });

//show notes
const showNotes = () => {
    let notes = localStorage.getItem("notes");
    if (notes) {
        notes = JSON.parse(notes);
    } else {
        notes = [];
    }
    let html = "";

    notes.forEach((element, index) => {
        html += `<div class="note_item">
        <div class="note_header">
            <h4>${element.title}</h4>
            <div class="more">
                <div class="note_drop">
                    <img src="./icons/trash-2.svg" width="15px" class="invert" alt="del" onclick="deleteNote(${index})"/>
                    <img src="./icons/edit.svg" width="15px" class="invert" alt="edit" onclick="editNote(${index})"/>
                </div>
            </div>
        </div>
        <div class="description">
            ${element.description}
        </div>
    </div>`;
    });
    document.querySelector(".note_container").innerHTML = html;
};

const deleteNote = (index) => {
    let notes = localStorage.getItem("notes");

    if (notes){
        notes = JSON.parse(notes);
    } else {
        notes = [];
    }

    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
};

const editNote = (index) =>{
    let notes = localStorage.getItem("notes");

    if (notes){
        notes = JSON.parse(notes);
    } else {
        notes = [];
    }
    Editor.style.display = "block";
    title.value = notes[index].title;
    description.value = notes[index].description;
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
};

//Searching here
let searchQuery = document.querySelector("#query");

searchQuery.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();
    let notes = localStorage.getItem("notes");
    
    if (notes) {
        notes = JSON.parse(notes);
    } else {
        notes = [];
    }
    
    let html = "";

    notes.forEach((element, index) => {
        if(element.title.toLowerCase().includes(value) || element.description.toLowerCase().includes(value)){
        html += `<div class="note_item">
        <div class="note_header">
            <h4>${element.title}</h4>
            <div class="more">
                <div class="note_drop">
                    <img src="./icons/trash-2.svg" width="15px" class="invert" alt="del" onclick="deleteNote(${index})"/>
                    <img src="./icons/edit.svg" width="15px" class="invert" alt="edit" onclick="editNote(${index})"/>
                </div>
            </div>
        </div>
        <div class="description">
            ${element.description}
        </div>
        </div>`;
        }
    });
    document.querySelector(".note_container").innerHTML = html;
});

//Delete all
deleteAll.addEventListener("click", () => {
    localStorage.clear();
    showNotes();
});

showNotes();
