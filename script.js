
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
            hits: []
        }
    );    
    let data = await fetch(pixabayPath + params.toString()); 
    let response = await data.json();   //convert the response to json

    console.log(response); //comment out this later
    let pixList = document.querySelector(".pix-list");
    for (let i = 0; i < response.hits.length; i++) {
        let imgUrl = response.hits[i].largeImageURL;
        let img = document.createElement('img');
        img.src = imgUrl;
        let tag = response.hits[i].tags;
        let tagp = document.createElement('p');
        tagp.textContent = tag;
        let photographer = response.hits[i].user;
        let user = document.createElement('p');
        user.textContent = photographer;
        pixList.appendChild(img);
        pixList.appendChild(tagp);
        pixList.appendChild(user);
    };
}

getDataFromPixabay(searchInput, color); //test fix this later