const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./nodes.js')

//console.log(getNotes())

//console.log(process.argv)


//Customize yargs version
yargs.version('1.1.0')

//Adding a yargs command

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        body: {
            describe: 'Body of note',
            demandOption: false,
            type: 'string'
        },
        title: {
            describe: 'title of note',
            demandOption: true,
            type: 'string'
        }
    },
    //Since a method converting it into ES6 syntax
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

//Remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            describe: 'title to remove a note',
            demandOption:true,
            type:'string'
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title)
        
    }
})

//List command
yargs.command({
    command: 'list',
    describe: 'Listing out all notes',
    handler: function(){
        //console.log("List out notes")
        notes.listNote()
    }
})

//Read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    //Using a builder object to add attributes of notes
    builder: {
        title: {
            describe: 'Title of a note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        //console.log("Reading a note")
        notes.readNote(argv.title)
    }
})

console.log(yargs.argv)
//You need to print console.log(yargs,argv at the bottom to execute your handler)
