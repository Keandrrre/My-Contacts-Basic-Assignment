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
  } else if (selection === "display-email") {
    displayByEmail();
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
  let index = findByEmail(contactsEmail);
  if (index === -1) {
    contacts.push(
      newContact(contactsName, contactsEmail, contactsNumber, contactsCountry)
    );
    outputEl.innerHTML = `New Contact Added:`;
  } else {
    outputEl.innerHTML = "Email already in use";
  }
  saveContacts();
}

function removeContact() {
  let email = prompt("Enter Contacts Email");
  let index = findByEmail(email);
  if (index === -1) {
    outputEl.innerHTML = "Contact Not Found";
  } else {
    contacts.splice(index, 1);
    outputEl.innerHTML = "Contact Removed";
  }
}

function displayByName() {
  let name = prompt("Enter Contacts Name");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name.includes(name) && contacts.length > 0) {
      outputStr += getContactHTMLStr(contacts[i], i);
    }
  }
  outputEl.innerHTML = outputStr;
}

function displayByCountry() {
  let country = prompt("Enter Contacts Country");
  let outputStr = "Contact Not Found";
  for (i = 0; i < contacts.length; i++) {
    if (contacts[i].country.includes(country)) {
      outputStr = getContactHTMLStr(contacts[i], i);
      break;
    }
  }
  outputEl.innerHTML = outputStr;
}

function displayByEmail() {
  let email = prompt("Enter Contacts Email");
  let index = findByEmail(email);
  outputStr = "";
  if (index === -1) {
    outputStr = "Contact Not Found";
  } else {
    outputStr = getContactHTMLStr(contacts[i], i);
  }
  outputEl.innerHTML = outputStr;
}

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

function findByEmail(email) {
  let index = -1;
  for (i = 0; i < contacts.length; i++) {
    if (contacts[i].email === email) {
      index = contacts[i];
      break;
    }
  }
  return index;
}
