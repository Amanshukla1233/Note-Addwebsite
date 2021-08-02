console.log("welcome to notes app.this is app.js");
showNotes();
//if user adds a note,add it to the localstorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addtxt = document.getElementById('addtxt');
    let addtitle = document.getElementById('addtitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let myobj={
        title:addtitle.value,
        text:addtxt.value
    }
    notesobj.push(myobj);
    //notesobj.push(addtxt.value);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";
    addtitle.value="";
    console.log(notesobj);
    showNotes();
})
//function to show from localstorage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
    <div class="noteCard  my-2 mx-2 card " style ="width: 200px;">

        <div class="card-body">
        
           <h5 class="card-title"> ${element.title}</h5>
            <p class="card-text">${element.text}</p>

            <a href="#"  id="${index}"onclick=" deleteNote(this.id)"class="btn btn-primary">delete Note</a>
        </div>
    </div>
    `;



    });
    let notesElm = document.getElementById('notes');
    if (notesobj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = 'nothing to show! use"Add Note " section above to add notes.';
    }
}
// function to delete a notes
function deleteNote(index) {
    //console.log('i am deleting',index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showNotes();
}
let search = document.getElementById('searchTxt');
search.addEventListener('input', function (){
    //console.log('input event');
    let inputVal= search.value.toLowerCase();
   //console.log('Input event fired!', inputVal);
    let notecards = document.getElementsByClassName('noteCard');
    Array.from(notecards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';

        }
        else {
            element.style.display = 'none';
        }
    })
})








