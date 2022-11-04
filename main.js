// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById("go-btn");
let menuEl = document.getElementById("menu");
let outputEl = document.getElementById("output");

// Global Variables
let contacts = loadContacts();

// Go Btn - Menu Listener
goBtnEl.addEventListener("click", goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === "display-all") {
    displayContacts();
  } else if (selection === "add") {
    addContact();
  } else if (selection === "remove") {
    removeContact();
  } else if (selection === "display-name") {
    displayByName();
  } else if (selection === "display-country") {
    displayByCountry();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = "";
  for (i = 0; i < contacts.length; i++) {
    outputStr += getContactHTMLStr(contacts[i], i);
  }
  outputEl.innerHTML = outputStr;
}

function addContact() {
  let contactsName = prompt("Enter Contacts Name: ");
  let contactsEmail = prompt("Enter Contacts Email");
  let contactsNumber = prompt("Enter Contacts Phone #");
  let contactsCountry = prompt("Enter Contacts Country");
  contacts.push(
    newContact(contactsName, contactsEmail, contactsNumber, contactsCountry)
  );
  saveContacts();
}

function removeContact() {
  let index = prompt("Enter # of Contact");
  if (index >= 0 && index < contacts.length) {
    contacts.splice(index, 1);
    saveContacts();
  }
}

function displayByName() {
  let name = prompt("Enter Contacts Name");
  let outputStr = "";
  for (i = 0; i < contacts.length; i++) {
    if (contacts[i].name == name) {
      outputStr = getContactHTMLStr(contacts[i], i);
    } else {
      outputStr = "Contact Not Found";
    }
  }
  outputEl.innerHTML = outputStr;
}
function displayByCountry() {}

// Helper Functions

function newContact(contactName, contactEmail, contactNumber, contactCountry) {
  return {
    name: contactName,
    email: contactEmail,
    number: contactNumber,
    country: contactCountry,
  };
}

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContacts() {
  let contactsStr = localStorage.getItem("contacts");
  return JSON.parse(contactsStr) ?? [];
}

function getContactHTMLStr(contacts, i) {
  return `<div>${i}: ${contacts.name}<br>${contacts.email}<br>${contacts.number} (${contacts.country})</div> `;
}
