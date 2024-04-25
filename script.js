//document.addEventListener('DOMContentLoaded', fetchArtData);

const quizForm = document.getElementById('quizForm');
let quizAnswer

let adjectiveArray = ['happy', 'forlorn', 'neurotic', 'formidable', 'exciting', 'anxious', 'unremarkable', 'exceptional', 
'fascinating', 'questionable', 'infuriating','permissable', 'silly', 'boring', 'mysterious', 'average', '[redacted]']
let actionArray = ['flossing your teeth', 'drinking paint', 'breaking the law', 'doing your homework', 'creating something new', 
'watching your step', 'practicing your craft', 'being mindful of others and their feelings', 'exploding', 'going outside', 
'murder','therapy', 'reading a book']

quizForm.addEventListener('submit', e=>{
    e.preventDefault();

    if(quizForm.q1.value == 'a'){
        console.log('user answered A')
        quizAnswer = 'sunflowers'
    }
    if(quizForm.q1.value == 'b'){
        console.log('user answered B')
        quizAnswer = 'magnolias'
    }
    if(quizForm.q1.value == 'c'){
        console.log('user answered C')
        quizAnswer = 'lavender'
    }
    if(quizForm.q1.value == 'd'){
        console.log('user answered D')
        quizAnswer = 'roses'
    }
    if(quizForm.q1.value == 'e'){
        console.log('user answered E')
        quizAnswer = 'hydrangeas'
    }
    fetchArtData();
    })

async function fetchArtData() {

    try {
        const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${quizAnswer}`
        
        const response = await fetch(url);
        
        console.log(url)

        if(!response.ok){
            throw new Error('Network response was not okay');
        }
        
        const data = await response.json();
        returnedItem = randomArt(data.objectIDs);
        console.log(`Object ID: ${returnedItem}`);
        interpretArt();
    }
    catch (error) {
        console.error('Fetch error', error);
    }
}

function displayArt(art){
    const artList = document.getElementById('artList');
    const artItem = document.createElement('div');

    randomAdjective = adjectiveArray[randomArt(adjectiveArray)]
    randomAction = actionArray[randomArt(actionArray)]

    artItem.innerHTML =
    `<p>Exhibitied sometime in the early 21st century, your medium for today is: ${art.medium}.</p> 
    <p>${art.medium} means that today will be a ${randomAdjective} day for you, perhaps consider ${randomAction}.`; 

    console.log(artItem);

    artList.appendChild(artItem);
}

function randomArt(item){
    return Math.floor(Math.random() * item.length);
    
}

async function interpretArt(){  
    try {
        const newResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${returnedItem}`);

        if(!newResponse.ok){
            throw new Error('Network response was not okay');
        }
        
        const newData = await newResponse.json();
        console.log(newResponse);
        displayArt(newData);
    }
    catch (error) {
        console.error('Fetch error', error)
    }

}