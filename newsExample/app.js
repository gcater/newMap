const API_KEY = '89af35883d9d42a3833dfb565403a39e'; // Replace with your API key

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
    const [virginiaArticles, californiaArticles] = await Promise.all([
        fetchNews(ENDPOINT_VIRGINIA),
        fetchNews(ENDPOINT_CALIFORNIA)
    ]);

    displayNews('virginia-news-list', virginiaArticles);
    displayNews('california-news-list', californiaArticles);
}

function displayNews(listId, articles) {
    const newsList = document.getElementById(listId);
    
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