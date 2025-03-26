const noteForm = document.getElementById('noteForm');
const noteTitleInput = document.getElementById('noteTitleInput');
const noteDescriptionInput = document.getElementById('noteDescriptionInput');
const noteDateInput = document.getElementById('noteDateInput');
const noteList = document.getElementById('noteList');

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('Notes')) || [];
    noteList.innerHTML = '';

    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.style.flexDirection = "column";
        li.style.padding = "15px";

        const noteHeader = document.createElement('div');
        noteHeader.classList.add('note-header');

        const textContainer = document.createElement('div');
        textContainer.classList.add('text');
        textContainer.innerHTML = `${note.title}<div class="date-time">${note.date} ${note.time}</div>`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', function (event) {
            event.stopPropagation(); 
            deleteNote(index);
        });

        noteHeader.appendChild(textContainer);
        noteHeader.appendChild(deleteButton);

        const description = document.createElement('div');
        description.classList.add('note-description');
        description.innerText = note.description;

        li.addEventListener('click', function () {
            description.style.display = description.style.display === "block" ? "none" : "block";
        });

        li.appendChild(noteHeader);
        li.appendChild(description);
        noteList.appendChild(li);
    });
}


function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('Notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('Notes', JSON.stringify(notes));
    loadNotes();
}

noteForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const title = noteTitleInput.value;
    const description = noteDescriptionInput.value;
    const date = noteDateInput.value;
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });

    if (title.trim() === "" || date.trim() === "") return;

    const notes = JSON.parse(localStorage.getItem('Notes')) || [];
    notes.push({ title, description, date, time });
    localStorage.setItem('Notes', JSON.stringify(notes));
    loadNotes();

    noteTitleInput.value = '';
    noteDescriptionInput.value = '';
    noteDateInput.value = '';
});

document.addEventListener('DOMContentLoaded', loadNotes);
