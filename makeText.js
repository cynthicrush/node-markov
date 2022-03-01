/** Command-line tool to generate Markov text. */
const fs = require('fs')
const process = require('process')
const axios = require('axios')

const markov = require('./markov')

function getText(text) {
    let mm = new markov.MarkovMachine(text)
    console.log(mm.makeText())
}

function readFiles(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if(err) {
            console.log(`Error reading ${path}: ${err}`)
            process.exit(1)
        } else{
            getText(data)
        }
    })
}

async function readURL(url) {
    let response = axios.get(url)
    response
    .then(res => {
        getText(res.data)
    })
    .catch(err => {
        console.log(`Error fetching ${url}: ${err}`)
        process.exit(1)
    })
}

let [type, path] = process.argv.slice(2)

if(type === 'file') {
    readFiles(path)
}
else if(type === 'url') {
    readURL(path)
} else {
    console.log(`Unknown type: ${type}`)
    process.exit(1)
}
