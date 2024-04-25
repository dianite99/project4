document.addEventListener('DOMContentLoaded', fetchArtData);

const quizForm = document.getElementById('quizForm');
let quizAnswer

quizForm.addEventListener('submit', e=>{
    e.preventDefault();

    if(quizForm.q1.value == 'a'){
        console.log('user answered A')
        quizAnswer = 'sunflowers'
    }
    if(quizForm.q1.value == 'b'){
        console.log('user answered B')
    }
    if(quizForm.q1.value == 'c'){
        console.log('user answered C')
    }
    if(quizForm.q1.value == 'd'){
        console.log('user answered D')
    }
    if(quizForm.q1.value == 'e'){
        console.log('user answered E')
    }
    })

async function fetchArtData() {

    try {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${quizAnswer}`);

        if(!response.ok){
            throw new Error('Network response was not okay');
        }
        
        const data = await response.json();
        console.log(response);
        console.log(response[1]);
        returnedItem = randomArt(response);
        console.log(returnedItem);
        interpretArt();
    }
    catch (error) {
        console.error('Fetch error', error);
    }
}

function displayArt(art){
    const artList = document.getElementById('artList');
    const artItem = document.createElement('div');

    artItem.innerHTML =
    `<p>Exhbitied sometime in the early 21st century, your medium for today is: ${art.medium}.</p> `; 

    console.log(artItem);

    artList.appendChild(artItem);
}

function randomArt(item){
    console.log(item.length);
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