const notes = [
  {
    id: 1,
    title: "first note",
    body: "dummy text 1",
    updated: "2024-08-11T09:01:14.061Z",
  },
  {
    id: 2,
    title: "second note",
    body: "dummy text 2",
    updated: "2024-09-11T09:10:14.061Z",
  },
  {
    id: 3,
    title: "third note",
    body: "dummy text 3",
    updated: "2024-09-11T09:12:27.619Z",
  },
];

export default class NotesAPI {
  static getAllNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    // const savedNotes = notes || [];
    return savedNotes.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  }

  static saveNote(noteToSave) {
    const notes = NotesAPI.getAllNotes();
    const existedNote = notes.find((n) => n.id === +noteToSave.id);

    if (existedNote) {
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
      existedNote.updated = new Date().toISOString();
    } else {
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }

    localStorage.setItem("notes-app", JSON.stringify(notes));
  }

  static deleteNote(id) {
    const notes = NotesAPI.getAllNotes();
    const filterdNotes = notes.filter((n) => n.id !== +id);
    localStorage.setItem("notes-app", JSON.stringify(filterdNotes));
  }
}

// console.log(NotesAPI.getAllNotes());

// console.log(
//   NotesAPI.saveNote({
//     id: 1,
//     title: "first note-edited",
//     body: "dummy text 1-edited",
//     updated: "2024-08-11T09:01:14.061Z",
//   })
// );

// console.log(NotesAPI.deleteNote(3));

// console.log(
//   NotesAPI.saveNote({
//     id: 2,
//     title: "second note",
//     body: "dummy text 2",
//     updated: "2024-08-13T021:01:14.061Z",
//   })
// );
