import { setActivePinia, createPinia } from "pinia";
import { useNoteStore } from "@/store/notes";
import { beforeEach, describe, it, expect } from "vitest";

describe("Test Note Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear;
  });

  it("Ajouter un note", async () => {
    const store = useNoteStore();
    const note = { title: "MKTest", content: ["Contenu"] };
    await store.addNote(note);
    expect(store.notes[0].title).toBe("MKTest");
  });

  it("Récupérer une note", async () => {
    const store = useNoteStore();
    const note = { title: "MKTest", content: ["Contenu"] };
    const id = store.notes[store.notes.length - 1]._id;
    await store.addNote(note);
    await store.getNote(id);
    expect(store.selectedItem.title).toBe("MKTest");
  });

  it("Modifier une note", async () => {
    const store = useNoteStore();
    const note = { title: "MKTest", content: ["Contenu"] };
    const id = store.notes[store.notes.length - 1]._id;
    await store.addNote(note);
    await store.updateNote(id, { title: "Biggo", content: ["Contenu"] });
    expect(store.notes[store.notes.length - 1].title).toBe("Biggo");
  });

  it("Supprimer une note", async () => {
    const store = useNoteStore();
    const note = { title: "Ichiro", content: ["Contenu"] };
    await store.addNote(note);
    const id = store.notes[store.notes.length - 1]._id;
    await store.deleteNote(id);
    expect(store.notes.find((n) => n.title === "Ichiro ")).toBeUndefined();
  });

  // it("Supprimer toutes les notes", async () => {
  //   const store = useNoteStore();
  //   const note = { title: "Delete", content: ["Deleted"] };
  //   await store.addNote(note);
  //   await store.deleteAllNote();
  //   expect(store.notes.length).toBe(0);
  // });
});
