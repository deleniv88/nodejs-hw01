const fs = require('fs/promises')
const path = require("path");

const constactsPath = path.resolve(__dirname, "./db/contacts.json");

const { nanoid } = require("nanoid");

async function listContacts() {
    try {
        const dbRaw = await fs.readFile(constactsPath, "utf-8");
        const db = JSON.parse(dbRaw)
        return db;
    } catch (error) {
        console.error(error);
    }
}

async function writeDB(db) {
    try {
        await fs.writeFile(constactsPath, JSON.stringify(db, null, 4))
    } catch (error) {
        console.error(error);
    }
}

async function addContact(name, email, phone) {
    try {
        const id = nanoid();
        const contact = { id, name, email, phone }

        const db = await listContacts();
        db.push(contact)

        await writeDB(db)
    } catch (error) {
        console.error(error);
    }

}

async function removeContact(contactId) {
    try {
        const db = await listContacts();

        const updateDB = db.filter((contact) => contact.id !== contactId)
        await writeDB(updateDB)
    } catch (error) {
        console.error();
    }

}

async function getContactById(contactId) {
    try {
        const db = await listContacts();
        const searchById = db.find(({ id }) => `${id}` === `${contactId}`);
        return searchById;
    } catch (error) {
        console.error(error);
    }

}

module.exports = {
    addContact,
    removeContact,
    listContacts,
    getContactById
}
