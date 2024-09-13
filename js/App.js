import NotesAPI from "./NotesAPI.js";
import NoteView from "./NotesView.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.view = new NoteView(root, this._handlers());
    this._refreshNotes();
  }

  _refreshNotes() {
    const notes = NotesAPI.getAllNotes();
    // set notes :
    this._setNotes(notes);
    // setctive note :
    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }

  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }

  _handlers() {
    return {
      onNoteAdd: () => {
        const newNote = {
          title: "New Note",
          body: "Take Some Note...",
        };
        NotesAPI.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (newTitle, newBody) => {
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        });
        this._refreshNotes();
      },
      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find((n) => n.id == noteId);
        this._setActiveNote(selectedNote);
      },
      onNoteDelete: (noteId) => {
        NotesAPI.deleteNote(noteId);
        this._refreshNotes();
      },
    };
  }
}

// const view = new NoteView(app, {
//   onNoteAdd() {
//     console.log("note added!");
//   },
//   onNoteEdit(newTitle, newBody) {
//     console.log(newTitle, newBody);
//   },
//   onNoteSelect(noteId) {
//     console.log(noteId);
//   },
//   onNoteDelete(noteId) {
//     console.log(noteId);
//   },
// });

// view.updateNoteList(NotesAPI.getAllNotes());
// view.updateActiveNote(NotesAPI.getAllNotes()[2]);
