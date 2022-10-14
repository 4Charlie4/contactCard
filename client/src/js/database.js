// import { openDB } from "idb";
// import "regenerator-runtime/runtime";

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
