startPixabay();
function startPixabay(){

    //remove template
    let pixTemplate = document.querySelector('#pix-template');
    pixTemplate.remove();

    //selectors
    let input = document.querySelector('.search-box');
    let query = document.querySelector('.text-search');
    const colorOption = document.querySelector('.color');
    const next = document.querySelector('.next-page');
    const previous = document.querySelector('.previous-page');

    //buttons false before search
    next.disabled = true; 
    previous.disabled = true;

    //variables for search
    //let  = 0;
    const page = 1;
    let pageCount = 0; 
    let color = ""; 
    let searchInput = "";

    // events
    input.onsubmit = x =>{               
        x.preventDefault();
        next.disabled= false;    
        searchInput = query.value;       
        if(query.value ===""){
            alert("You haven't entered any search words");
            return startPixabay();
        }        
        color = colorOption.value;
        pageCount++;
        let currentP = page + pageCount;
        getPhotos(query.value, colorOption.value, currentP);
    }

    next.onclick = y => {        
        query.value;
        colorOption.value
        pageCount ++;
        let currentP = page + pageCount;
        if(currentP > 1){
            previous.disabled= false; 
        }
        if (currentP <= 1){
            previous.disabled = true;
        }
        getPhotos(query.value, colorOption.value, currentP);     
    }
                
    previous.onclick = y => {
            query.value;
            colorOption.value
            pageCount --;
            let currentP = page + pageCount
            getPhotos(query.value, colorOption.value, currentP);     
    }

    async function getPhotos(searchInput, color, currentP){

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
                page: currentP, //page on now
                per_page: 3, //ÄNDRA TILLBAKA EFTER TEST TILL 10
                hits: []
            }
        );    
        let data = await fetch(pixabayPath + params.toString()); 
        let response = await data.json();   //convert the response to json
        console.log(response); //comment out this later
        displayPhotos(response); // call method for result  
        return response;      
    }    

    function displayPhotos(response){

            if(response.totalHits === 0){

                document.querySelector('.gallery-container').innerHTML = "Sorry, no results were found.";  
                return startPixabay();              
            }
            
            let pixList = document.querySelector('#pix-list');
            //let pixTemplate = document.querySelector('#pix-template');
            //pixTemplate.remove();
            for (let i = 0; i < response.hits.length; i++) {
                let pixLi = pixTemplate.content.firstElementChild.cloneNode(true);
                let imgUrl = response.hits[i].largeImageURL;
                pixLi.querySelector('.display-photo').src = imgUrl;
                let tag = response.hits[i].tags;
                let tagtext = "Tags: "
                pixLi.querySelector('.tag').textContent = tagtext + tag;
                let photographer = response.hits[i].user;
                let userText= "Photo taken by: ";
                pixLi.querySelector('.user').textContent = userText + photographer;
                pixList.append(pixLi);
            }
        }

    function clearGallery(){
        let pixList = document.querySelector('#pix-list');
        let pixLi = pixList.querySelectorAll('li')
        for (const pix of pixLi){
            pixList.remove(pix);
        }
    }
}