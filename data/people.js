const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json')
    return data // this will be the array of people
}

async function searchByName(firstOrLast){
    if (!firstOrLast) throw "you must provide a name to search for"
    const peopleData = await getPeople();
    const length = peopleData.length
    let matchingPeople = []
    let count = 0
    for (let i = 0; i < length; i ++){
        if (peopleData[i].firstName.toLowerCase().includes(firstOrLast.toLowerCase()) || peopleData[i].lastName.toLowerCase().includes(firstOrLast.toLowerCase())) {
            matchingPeople.push(peopleData[i])
            count++
        }
        if (count === 20) return matchingPeople
    }
    return matchingPeople
}

async function getPersonById(id){

    if(id === undefined){
        throw "error, input is null"
    }else if(!Number.isInteger(id)){
        throw "error,input is not an Integer"
    }else{
        const data = await getPeople()
        const length = data.length
        for (let i = 0 ; i < length; i ++){
            if (data[i].id === id){
                return data[i]
                break
            }
        }
        throw "error, id out of bounds"

    }

}

async function lexIndex(index){

    if(index === undefined){
        throw "error, input is null"
    }else if(!Number.isInteger(index)){
        throw "error,input is not an Integer"
    }else{
        const data = await getPeople()
        const length = data.length
        if (index < 0 || index > length -1){
            throw "erroe, index out of bounds"
        }
        let sortedData = data.sort(sortByLex())
        return sortedData[index].firstName + " " + sortedData[index].lastName
    }

}

function sortByLex(){
    return function(a, b){
        let aToLower = a.lastName.toLowerCase()
        let bToLower = b.lastName.toLowerCase()
        if (aToLower < bToLower){
            return -1;
        }
        if (aToLower > bToLower){
            return 1;
        }
        return 0;
    }
}

async function firstNameMetrics(){

    const data = await getPeople()
    const length = data.length
    let totalLetters = 0
    let totalVowels = 0
    let totalConsonants = 0
    let longestName = data[0].firstName
    let shortestName = data[0].firstName
    for (let i = 0; i < length; i++){
        totalLetters += data[i].firstName.length
        let longestLength = longestName.length
        let shortestLength = shortestName.length
        let currentLength = data[i].firstName.length
        if (currentLength > longestLength) {
            longestName = data[i].firstName
        }
        if (currentLength < shortestLength){
            shortestName = data[i].firstName
        }
        for (let j = 0; j < data[i].firstName.length; j ++){
            let charInStr = data[i].firstName[j].toLowerCase()
            if (charInStr === "a" || charInStr === "e" || charInStr === "i" || charInStr === "o" || charInStr === "u"){
                totalVowels += 1
            }
        }
    }
    let matrix = {
        totalLetters: totalLetters,
        totalVowels: totalVowels,
        totalConsonants: totalLetters - totalVowels,
        longestName: longestName,
        shortestName: shortestName
    }
    return matrix

}

module.exports = {
    getPeople,
    getPersonById,
    lexIndex,
    firstNameMetrics,
    searchByName
};