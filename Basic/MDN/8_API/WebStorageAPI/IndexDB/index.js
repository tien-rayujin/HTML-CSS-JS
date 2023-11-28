// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

let db;
// open databbase, create if doesn't already exist
const openRequest = window.indexedDB.open("notes_db", 1);

// error handler signifies that the database didn't open successfully
openRequest.addEventListener("error", () =>
  console.error("Database failed to open"),
);

// success handler signifies that the database opened successfully
openRequest.addEventListener("success", () => {
  console.log("Database opened successfully");

  // Store the opened database object in the db variable. This is used a lot below
  db = openRequest.result;

  // Run the displayData() function to display the notes already in the IDB
  displayData();
});

// This handler runs if the database has not already been set up
openRequest.addEventListener("upgradeneeded", (e) => {
  db = e.target.result;

  const objectStore = db.createObjectStore("notes_os", {
    keyPath: "id",
    autoIncrement: true
  });

  objectStore.createIndex("title", "title", { unique: false });
  objectStore.createIndex("body", "body", { unique: false });

  console.log("Database setup complete");
});

form.addEventListener("submit", addData);

function addData(e) {
  e.preventDefault();

  const newItem = {
    title: titleInput.value,
    body: bodyInput.value
  };

  const transaction = db.transaction(["notes_os"], "readwrite");

  const objectStore = transaction.objectStore("notes_os");

  const addRequest = objectStore.add(newItem);

  addRequest.addEventListener("success", () => {
    titleInput.value = "";
    bodyInput.value = "";
  });

  transaction.addEventListener("complete", () => {
    console.log("Transaction completed: database modification finished.");

    displayData();
  });

  transaction.addEventListener("error", () => {
    console.log("Transaction not opened due to error");
  });
}

function displayData() {
  // Here we empty the contents of the list element each time the display is updated
  // If you didn't do this, you'd get duplicates listed each time a new note is added
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  const objectStore = db.transaction("notes_os").objectStore("notes_os");

  objectStore.openCursor().addEventListener("success", (e) => {
    const cursor = e.target.result;

    if (cursor) {
      const listItem = document.createElement("li");
      const h3 = document.createElement("h3");
      const para = document.createElement("p");

      listItem.appendChild(h3);
      listItem.appendChild(para);
      list.appendChild(listItem);

      h3.textContent = cursor.value.title;
      para.textContent = cursor.value.body;

      listItem.setAttribute("data-note-id", cursor.value.id);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      listItem.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", deleteItem);

      cursor.continue();
    } else {
      // list item is empty
      if (!list.firstChild) {
        const listItem = document.createElement("li");
        listItem.textContent = "No notes stored.";
        list.appendChild(listItem);
      }

      console.log("Notes all displayed");
    }
  });
}

function deleteItem(e) {
  const noteId = Number(e.target.parentNode.getAttribute("data-note-id"));

  const transaction = db.transaction(["notes_os"], "readwrite");
  const objectStore = transaction.objectStore("notes_os");
  const deleteRequest = objectStore.delete(noteId);

  transaction.addEventListener("complete", () => {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    console.log(`Note ${noteId} deleted.`);

    if (!list.firstChild) {
      const listItem = document.createElement("li");
      listItem.textContent = "No notes stored.";
      list.appendChild(listItem);
    }
  });
}