const API_KEY="c7acd51b133e260c42c0e5f629a9885c";const BASE_URL="https://gnews.io/api/v4/search";window.addEventListener("load",()=>fetchNews("India"));function reload(){window.location.reload()}
async function fetchNews(query){try{const cardsContainer=document.getElementById("cards-container");const response=await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&token=${API_KEY}`);if(!response.ok){throw new Error(`API request failed with status ${response.status}`)}
const data=await response.json();bindData(data.articles||[])}catch(error){console.error("Error fetching news:",error);cardsContainer.innerHTML=`
            <div class="card">
                <div class="card-content">
                    <h3>News Loading Failed</h3>
                    <p class="news-desc">Please check your internet connection and try again.</p>
                </div>
            </div>
        `}}
function bindData(articles){const cardsContainer=document.getElementById("cards-container");const newsCardTemplate=document.getElementById("template-news-card");cardsContainer.innerHTML="";articles.forEach((article)=>{if(!article.image)return;const cardClone=newsCardTemplate.content.cloneNode(!0);fillDataInCard(cardClone,article);cardsContainer.appendChild(cardClone)})}
function fillDataInCard(cardClone,article){const newsImg=cardClone.querySelector("#news-img");const newsTitle=cardClone.querySelector("#news-title");const newsSource=cardClone.querySelector("#news-source");const newsDesc=cardClone.querySelector("#news-desc");newsImg.src=article.image||"https://via.placeholder.com/400x200";newsTitle.innerHTML=article.title;newsDesc.innerHTML=article.description||"No description available";const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta",});newsSource.innerHTML=`${article.source.name || "Unknown source"} · ${date}`;cardClone.firstElementChild.addEventListener("click",()=>{window.open(article.url,"_blank")})}
let curSelectedNav=null;function onNavItemClick(id){fetchNews(id);const navItem=document.getElementById(id);curSelectedNav?.classList.remove("active");curSelectedNav=navItem;curSelectedNav.classList.add("active")}
const searchButton=document.getElementById("search-button");const searchText=document.getElementById("search-text");searchButton.addEventListener("click",()=>{const query=searchText.value;if(!query)return;fetchNews(query);curSelectedNav?.classList.remove("active");curSelectedNav=null})
