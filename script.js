let notes = JSON.parse(localStorage.getItem("notes")) || [];

const noteForm = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("noteTitle").value.trim();
  const text = document.getElementById("noteText").value.trim();
  if (!title || !text) return;

  const newNote = {
    title,
    text,
    createdAt: new Date().toLocaleString(),
    archived: false,
  };
  notes.push(newNote);
  updateNotes();
  noteForm.reset();
});

function updateNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

function renderNotes() {
  notesList.innerHTML = "";
  notes.forEach((note, i) => {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note" + (note.archived ? " archived" : "");

    noteDiv.innerHTML = `
      <h3 contenteditable onblur="editNoteTitle(${i}, this.innerText)">${
      note.title
    }</h3>
      <p contenteditable onblur="editNoteText(${i}, this.innerText)">${
      note.text
    }</p>
      <small>${note.createdAt}</small>
      <div class="actions">
        <button onclick="toggleArchive(${i})">${
      note.archived ? "Розархівувати" : "Архівувати"
    }</button>
        <button onclick="deleteNote(${i})">Видалити</button>
      </div>
    `;
    notesList.appendChild(noteDiv);
  });
}

function toggleArchive(index) {
  notes[index].archived = !notes[index].archived;
  updateNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  updateNotes();
}

function editNoteTitle(index, newTitle) {
  notes[index].title = newTitle.trim();
  updateNotes();
}

function editNoteText(index, newText) {
  notes[index].text = newText.trim();
  updateNotes();
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

document.getElementById("deleteAll").addEventListener("click", () => {
  if (confirm("Ви впевнені, що хочете видалити всі нотатки?")) {
    notes = [];
    saveNotes();
    renderNotes();
  }
});

document.getElementById("archiveAll").addEventListener("click", () => {
  notes = notes.map((note) => ({
    ...note,
    archived: true,
  }));
  saveNotes();
  renderNotes();
});

renderNotes();
