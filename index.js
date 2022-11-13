import json from "./my.json" assert { type: "json" };
const NOTE_LIST = "note-list";
let list = localStorage.getItem(NOTE_LIST);

function createNewElement() {
  list.push({ title: "new note", description: "" });
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem(NOTE_LIST, JSON.stringify(list));
}

if (!list || !list.length) {
  list = [];
  createNewElement();
} else {
  list = JSON.parse(list);
}

function renderList() {
  root.innerHTML = "";
  list.forEach((note, i) => {
    const container = document.createElement("div");
    container.className = "container";

    const titleEl = document.createElement("input");
    titleEl.value = note.title;
    titleEl.addEventListener("change", (e) => {
      note.title = e.target.value;
      updateLocalStorage();
    });

    const descriptionEl = document.createElement("textarea");
    descriptionEl.innerHTML = note.description;
    descriptionEl.addEventListener("change", (e) => {
      note.description = e.target.value;
      updateLocalStorage();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerHTML = "❌";
    deleteBtn.onclick = () => {
      list = list.filter((el, elIdx) => i !== elIdx);
      updateLocalStorage();
      renderList();
    };

    container.appendChild(deleteBtn);
    container.appendChild(titleEl);
    container.appendChild(descriptionEl);

    root.appendChild(container);
  });
}

const root = document.getElementById("root");
renderList();

const addBtn = document.createElement("button");
addBtn.className = "add";
addBtn.innerHTML = "➕";
addBtn.onclick = () => {
  createNewElement();
  renderList();
};

document.getElementsByTagName("body")[0].appendChild(addBtn);
