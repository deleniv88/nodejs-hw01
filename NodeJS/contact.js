// const fs = require("fs");
const fs = require('fs/promises')
const path = require("path");

const constactsPath = path.resolve(__dirname, "./db/contacts.json");

const { nanoid } = require("nanoid");

async function listContacts(){
    const dbRaw = await fs.readFile(constactsPath, "utf-8");
    const db = JSON.parse(dbRaw)
    return db;
}

async function writeDB(db){
   await fs.writeFile(constactsPath, JSON.stringify(db, null, 4))
}

async function addContact(name, email, phone){
    const id = nanoid();
    const contact = {id, name, email, phone}

    const db = await listContacts();
    db.push(contact)

    await writeDB(db)
}

async function removeContact(contactId){
    const db = await listContacts();

    const updateDB = db.filter((contact) => contact.id !== contactId)
    await writeDB(updateDB)
}

async function getContactById(contactId){
    const db = await listContacts();
    const searchById = db.find(({id}) => `${id}` === `${contactId}`);
    return searchById;
}

module.exports = {
    addContact,
    removeContact,
    listContacts,
    getContactById
}