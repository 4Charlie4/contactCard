// import { openDB } from "idb";
// import "regenerator-runtime/runtime";

import { openDB } from "idb";

// //When it comes to functions you must specifically export them like this so that you can import them.
export const initData = async () => {
  //Creates new database with version number
  openDB("contact_db", 1, {
    //Adds database schema if not done already.
    upgrade(db) {
      //Checks if database already exists
      if (db.objectStoreNames.contains("contacts")) {
        console.log("Contacts store already exists");
        return;
      }
      //creates new Database with an ID that auto increments
      db.createObjectStore.contains("contacts", {
        keyPath: "id",
        autoIncrement: true,
      });
      console.log("Contacts store created");
    },
  });
};

export const getData = async () => {
  console.log("GETALL from Database");

  //Connects to the Database and the version we want to use
  const contactDb = await openDB("contact_db", 1);
  //Creates a new transaction and allows you to specify what store and what you can do to it.
  const tx = contactDb.transaction("contacts", "readonly");
  //Opens the specified object store
  const store = tx.objectStore("contacts");
  //Gets all data from database.
  const request = store.getAll();

  const result = await request;
  console.log("result.value", result);
  return result;
};

export const addData = async (name, email, phone, profile) => {
  console.log("POST to Database");
  const contactDb = await openDB("contact_db", 1);

  const tx = contactDb.transaction("contacts", "readwrite");

  const store = tx.objectStore("contacts");
  const request = store.add({
    name: name,
    email: email,
    phone: phone,
    profile: profile,
  });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

export const delData = async (id) => {
  console.log("DELETE from Database", id);

  const contactDb = await openDB("contact_db", 1);

  const tx = contactDb.transaction("contacts", "readwrite");

  const store = tx.objectStore("contacts");

  const request = store.delete(id);

  const result = await request;
  console.log("result.value: ".result);
  return result?.value;
};

export const editData = async (id, name, email, phone, profile) => {
  console.log("UPDATE from Database", id);

  const contactDb = await openDB("contact_db", 1);

  const tx = contactDb.transaction("contacts", "readwrite");

  const store = tx.objectStore("contacts");

  const request = store.put({id: id,
    name: name,
    email: email,
    phone: phone,
    profile: profile,
  });

  const result = await request;
  console.log("🚀 - data saved to the database", result);
};
