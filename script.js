let page = 1; 
let searchQuery= "";
let searchValue = false;

const pixabayApiKey = "25606330-787c5313477323740e4102695";
const pixabayUrl = "https://pixabay.com/api/?key="+pixabayApiKey+"&q="+encodeURIComponent('cat');
const input = document.querySelector('#text-search');
const color = document.querySelector('#color');
const searchButton = document.querySelector('#search-button');
const next = document.querySelector('#next-page');
const previous = document.querySelector('#previous-page');

input.addEventListener("#text-search", (x) => {
    x.preventDefault();
    searchQuery = x.target.value;
});

async function getDataFromPixabay(){
    
    const data = await fetch(pixabayUrl); 
    const response = await data.json();   //convert the response to json 
    console.log(response);
    return response;
}
getDataFromPixabay();



/*const pixabayUrl = 'https://pixabay.com/api';
const pixabayApiKey = '5606330-787c5313477323740e4102695';
const searchTerm = 'q'*/

/*let params = new URLSearchParams({

    appid: pixabayApiKey,
    image_type: "photo",   
});*/