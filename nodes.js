const fs = require('fs')
const chalk = require('chalk')

//Converting a function to arrow function
const getNotes = () => {
    return "These are notes from nodes.js file"
}

//debugger

const addNotes = (title,body) => {
    const notes = loadNotes()
    console.log(notes)

    //filter function will trace entire array even if duplicate note found
    const duplicateNotes = notes.filter((note) =>  note.title === title)

    const duplicateNote = notes.find((note) => note.title === title)

    //const duplicateNotes = notes.filter(function(note){
     //   return note.title === title
    //})


    //if (duplicateNotes.length === 0)
    if(!duplicateNote)
    {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen("Note added"))
    }
    else
    {
        console.log(chalk.bgRed("Title already taken"))

    }

}

const saveNotes=function(notes){
    const jsonData = JSON.stringify(notes)
    fs.writeFileSync('notes.json',jsonData)
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const jsdata=dataBuffer.toString()
        return JSON.parse(jsdata)
    }catch(e){
        return []
    }

    
}

const removeNotes = function(title){
    //console.log("removing a note")
    const notes=loadNotes()
    const removeNote=notes.filter(function(note){
        return note.title != title
    })
    saveNotes(removeNote)

    if(notes.length == removeNote.length)
    {
        console.log(chalk.bgRed("No note removed"))
    }
    else
        console.log(chalk.bgGreen("Note removed"))
}

const listNotes = () => {
    console.log(chalk.bold.yellow("Your Notes"))

    const NoteList=loadNotes()
    NoteList.forEach(element => {
        console.log(element.title)
    });
}

const readNotes = function(title){
    const noteList = loadNotes()
    const displayNote=noteList.find((note) => note.title === title)

    if(displayNote)
    {
        console.log(chalk.bold.italic(displayNote.title))
        console.log(displayNote.body)

        console.log(chalk.bgGreen("Note found to read"))
    }
    else
    {
        console.log(chalk.bgRed("Note not found"))
    }
}

module.exports = {
    getNote: getNotes,
    addNote: addNotes,
    removeNote: removeNotes,
    listNote: listNotes,
    readNote: readNotes
}