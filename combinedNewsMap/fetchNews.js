const API_KEY = '89af35883d9d42a3833dfb565403a39e'; // Replace with your API key
const ENDPOINT = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const ENDPOINT_VIRGINIA = `https://newsapi.org/v2/top-headlines?q=Virginia&apiKey=${API_KEY}`;
const ENDPOINT_CALIFORNIA = `https://newsapi.org/v2/top-headlines?q=California&apiKey=${API_KEY}`;

async function fetchNews(endpoint) {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        if (data.status !== "ok") {
            throw new Error(data.message);
        }
        
        return data.articles;
    } catch (error) {
        console.error("Error fetching news:", error);
        return []; // Return an empty array on failure, so the app can continue
    }
}

async function fetchMultipleNews() {
    const [topArticles, virginiaArticles, californiaArticles] = await Promise.all([
        fetchNews(ENDPOINT),
        fetchNews(ENDPOINT_VIRGINIA),
        fetchNews(ENDPOINT_CALIFORNIA)
    ]);
    displayNews('california-news-list', californiaArticles);
    displayNews('virginia-news-list', virginiaArticles);
    //displayNews('topHeadlines-news-list', topArticles);
    
    
}

function displayNews(listId, articles) {
    const newsList = document.getElementById(listId);
    console.log(newsList);
    
    // Create the <ul> element if it doesn't exist
    if (!newsList) {
        const listContainer = document.querySelector('.list-container');
        const newUl = document.createElement('ul');
        newUl.id = listId;
        listContainer.appendChild(newUl);
    }
    
    // Clear out any old content
    newsList.innerHTML = '';

    articles.forEach(article => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        link.href = article.url;
        link.textContent = article.title;
        link.target = "_blank";
        
        listItem.appendChild(link);
        newsList.appendChild(listItem);
    });
}


fetchMultipleNews();