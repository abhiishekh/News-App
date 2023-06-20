const API_KEY = "3269ec36300b4f3e8354485ce1c94edb";
const URL = "https://newsapi.org/v2/everything?q=";
let currentDate = new Date().toJSON().slice(0, 10);
console.log(currentDate); // "2022-06-17"

window.addEventListener('load',()=> fetchNews("India"));
function reload(){
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainerDiv = document.getElementById('cards-container');
    const newsCardTemplateDiv = document.getElementById('template-news-card');

    cardContainerDiv.innerHTML = ' ';

    articles.forEach((articles) => {
        if(!articles.urlToImage) return;
        const cardClone = newsCardTemplateDiv.content.cloneNode(true);
        fillDataInCard(cardClone,articles);
        cardContainerDiv.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,articles){
    const newsImg  = cardClone.querySelector('#news-img');
    const newsTitle  = cardClone.querySelector('#news-title');
    const newsSource  = cardClone.querySelector('#news-source');
    const newsDesc  = cardClone.querySelector('#news-desc');

    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;
    newsDesc.innerHTML = articles.description;

    const date = new Date(articles.publishedAt).toLocaleDateString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${articles.source.name} - ${date}`;
    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(articles.url,"blank");
    })

}
let curSelecteNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelecteNav?.classList.remove('active');
    curSelecteNav = navItem;
    curSelecteNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelecteNav?.classList.remove('active');
    curSelecteNav = null;
});
