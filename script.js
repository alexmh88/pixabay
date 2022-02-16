startPixabay();

function startPixabay(){

    //remove template
    let pixTemplate = document.querySelector('#pix-template');
    pixTemplate.remove();

    //selectors
    let input = document.querySelector('.search-box');
    let query = document.querySelector('.text-search');
    let colorOption = document.querySelector('.color');
    let next = document.querySelector('.next-page');
    let previous = document.querySelector('.previous-page');
 
    //buttons false before search
    next.disabled = true; 
    previous.disabled = true;

    //variables for search
    let page = 0; //use for counting pages 
    let pageCount = 0; //count next page
    let totPages = 0;
    let whatPageOn = 0;
    let color = ""; 
    let searchInput = "";

    // events
    input.addEventListener('submit', (event) =>{
        
        event.preventDefault();                            
        searchInput = query.value;  
        color = colorOption.value;
        pageCount++;
        let currentP = page + pageCount;     

        if(query.value ===""){ 
            alert("You haven't entered any search words");
            return;  
        }        
        
        getPhotos(query.value, colorOption.value, currentP);    
    });
    
    input.addEventListener('change', (event) => {       
        event.preventDefault();
        next.disabled = true;

        input.onsubmit = x =>{ 
            clearGallery();         
            x.preventDefault();  
            searchInput = query.value;       
            if(query.value ===""){
                alert("You haven't entered any search words");
                return startPixabay();
            }
            else{
                clearGallery();
                pageCount = 0;
                color = colorOption.value;
                pageCount++;
                let currentP = page + pageCount;
                console.log(currentP)
                getPhotos(query.value, colorOption.value, currentP);
            }            
        }
    });

    next.addEventListener('click', (event) => {
        
        event.preventDefault();
        clearGallery();       
        query.value;
        colorOption.value
        pageCount ++;
        let currentP = page + pageCount;
        if(currentP != 0) {
            previous.disabled = false; 
        }
        getPhotos(query.value, colorOption.value, currentP);
        console.log(currentP);
         
    });
                
    previous.addEventListener('click', (event) => {
            clearGallery();
            event.preventDefault(); 
            query.value;
            colorOption.value
            pageCount --;
            let currentP = page + pageCount;
            if(currentP == 1) {

                previous.disabled = true; 
            }
            getPhotos(query.value, colorOption.value, currentP);
            console.log(currentP);      
    });

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
                page: currentP, 
                per_page: 10
            }
        );    
        let data = await fetch(pixabayPath + params.toString()); 
        let response = await data.json();   
        let getNoPages = Math.floor(response.totalHits/10);
        totPages = getNoPages;
        whatPageOn = currentP;
        console.log(totPages); //comment out this later
        console.log(response.totalHits); //comment out this later
        if(response.totalHits === 0){
            alert("We couldn't find what you're looking for.");
            return;  
        }        
        else{
            displayPhotos(response);
        }
 
        return totPages;      
    }    

    function displayPhotos(response){

        if(totPages != 0 && totPages >= whatPageOn){
           next.disabled = false;
        }
        else{
            next.disabled = true;
        }

        let pixList = document.querySelector('#pix-list');        
        let l = response.hits.length;
        
            for (let i = 0; i < l; i++) {
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
    
    //Function remove li items (img, tags, photographer)   
    function clearGallery(){
        let pixList = document.querySelector('#pix-list');
        let pixLi = pixList.querySelectorAll('li')
        for (let pix of pixLi){
            pix.remove(pixList);
        }
    }

}