
    let page = 1; //default value 1
    let searchInput= "raccoon"; //test - fix this later
    let searchValue = false;
    let color = "black"; //test fix this later

    const input = document.querySelector('#text-search');
    const colorOption = document.querySelector('#color');
    const searchButton = document.querySelector('#search-button');
    const photogallery = document.querySelector('#display-photo')
    const next = document.querySelector('#next-page');
    const previous = document.querySelector('#previous-page');

    input.addEventListener("#text-search", (x) => {
        x.preventDefault();
        searchInput = x.target.value;
    });
    
async function getDataFromPixabay(searchInput, page, color){
    
    const pixabayApiKey = '25606330-787c5313477323740e4102695';
    const pixabayPath = 'https://pixabay.com/api/?';
    let params = new URLSearchParams(
        {
            method: 'GET',
            content_type: 'application/json',
            key: pixabayApiKey,           
            q: searchInput,
            image_type: 'photo',
            colors: color,
            page: page,
            per_page: 10,
        }
    );    
    const data = await fetch(pixabayPath + params.toString()); 
    const response = await data.json();   //convert the response to json 
    console.log(response); //comment out this later
    return response;
    };

getDataFromPixabay(searchInput, page, color); //test fix this later