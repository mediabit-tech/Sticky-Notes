console.log("Notes App running!");
showNotes();
// If user add a note, add it tohe local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    // Define the variable for html items help of id
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");

    // Fetch the data from local storage
    let notes = localStorage.getItem("notes");

    // Condition for local storage is null or not
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    // Create an object literal for making an object with title and text
    let myObj = {
        title : addTitle.value,
        text : addTxt.value
    }

    // Store data into array as a notesObj variable and parse it
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    // Clear the screen after submit the value
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);

    // fetch notes from local storage
    showNotes();
});

// Function to show element from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    // Create dynamic cardNotes for notes
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard mx-2 my-2 card" style="width: 15.68rem">
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
        </div>
        `;
    });

    // Define and fetch the value for html items help of id from local storage
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a note" section above to add notes.`;
    }
}

// Function to delete a note
function deleteNote(index) {
    // console.log('Deleted note', index)

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    // Remove the element from local storage
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// search item on search bar
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
        // console.log(cardTxt);
    })
})