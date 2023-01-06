const {addContact, removeContact, listContacts, getContactById} = require("./contact");

const {Command} = require("commander");
const program = new Command();

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <remove>", "user id")
    .option("-n, --name <add>", "user name")
    .option("-e, --email <add>", "user email")
    .option("-p, --phone <add>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({action, id, name, email, phone}){
    switch(action){
        case "list":
            const contact = await listContacts()
            console.table(contact)
            break;
        case "get":
            const contactById = await getContactById(id)
            console.table(contactById)
            break;
        case "add":
            console.log("invoke add", name, email, phone);
            await addContact(name,email,phone)
            break;
        case "remove":
            console.log("invoke remove");
            await removeContact(id)
            break;
        default :
        console.warn("\x1B[31m Unknown type");
        break;
    }
}

invokeAction(argv); 
