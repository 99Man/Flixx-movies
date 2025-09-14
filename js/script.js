const globalState = {
    currentPage: window.location.pathname,
    search:{
        term: '',
        type: '',
        page: 1,
        totalPages: 1,
    },
    apiKey:{
        apiKey:'3729b931495b6fb9ca5f15bf12f3e4d3',
        apiUrl: 'https://api.themoviedb.org/3/',
    }
}

async function displayPopularMovies() {
    const { results } = await fetchApi('movie/popular');
    console.log(results);

    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<div class="card">
        <a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path ? `<img
                src= "https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
            />` : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="Movie Title"
            />`}
        </a>
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
        </div>
        </div>`;
        document.getElementById('popular-movies').appendChild(div);
    })
}

async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1];
    const movie = await fetchApi(`movie/${movieId}`);
    console.log(movie);
    await displayBackground('movie', movie.backdrop_path);
    const div = document.createElement('div');
    div.innerHTML = `<div class="details-top">
        <div>
            ${movie.poster_path ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
            />`:`<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
            />`}
        </div>
        <div>
            <h2>${movie.title}</h2>
            <p>
            <i class="fas fa-star text-primary"></i>
            ${movie.vote_average} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
                ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${movie.genres.map(genre => ` ${genre.name}`)}

            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
        </div>
        <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
            <li><span class="text-secondary">Budget:</span> ${'$'+movie.budget}</li>
            <li><span class="text-secondary">Revenue:</span> ${'$'+movie.revenue}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime+"m"}</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${movie.production_companies.map(companies => ` ${companies.name}`)}</div>
        </div>`;
        document.getElementById('movie-details').appendChild(div);
}

async function displayBackground(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100%';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.3';

    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}



async function displayTvShows() {
    const {results} = await fetchApi('tv/popular');
    console.log(results);
    results.forEach(show => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<div class="card">
        <a href="tv-details.html?id=${show.id}">
            ${show.poster_path ? `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="Show Title${show.name}"
            />`: `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="Show Title"
            />`}
        </a>
        <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
            <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
        </div>
        </div>`;
        document.getElementById('popular-shows').appendChild(div);
    })
}

async function displayShowDetails() {
    const movieId = window.location.search.split('=')[1];
    const show = await fetchApi(`tv/${movieId}`);
    await displayBackground('show', show.backdrop_path);

    console.log(show);
    const div = document.createElement('div');
    div.innerHTML = `<div class="details-top">
        <div>
            ${show.poster_path ? `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.title}"
            />`: `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
            />`}
        </div>
        <div>
            <h2>${show.name}</h2>
            <p>
            <i class="fas fa-star text-primary"></i>
            ${show.vote_average} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
            ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${show.genres.map(genre => ` ${genre.name}`)}
            </ul>
            <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
        </div>
        </div>
        <div class="details-bottom">
        <h2>Show Info</h2>
        <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
            <li>
            <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${show.production_companies.map(companies => ` ${companies.name}`)}</div>
        </div>`

    document.getElementById('show-details').appendChild(div);
}

async function displaySliderShow(){
    const {results} = await fetchApi('movie/now_playing');
    console.log(results);
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML =`<div class="swiper-slide">
            <a href="movie-details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
        </div>`;
        document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
    })
}

async function initSwiper(){
    const swiper =new Swiper('.swiper',{
        slidesPerView : 1,
        spaceBetween : 30,
        loop : true,
        freeMode : true,
        autoplay : {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints : {
            500: {
                slidesPerView: 2,
            },
            700: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        }
    })
}

async function search(){
    const queryString =window.location.search;
    const urlParams = new URLSearchParams(queryString);
    globalState.search.term = urlParams.get('search-term');
    globalState.search.type = urlParams.get('type');

    if(globalState.search.term !== '' && globalState.search.term != null){
        const {results, total_pages, page, total_results} = await searchApiData();
        console.log(results);
        globalState.search.page = page;
        globalState.search.totalPages = total_pages;
        globalState.search.totalResults = total_results;
        if(results.lenght === 0){
            displayAlert('No results found');
            return;
        }
        await displayFilterResults(results);
        document.getElementById('search-term').value ='';
    }else{
        displayAlert('Please enter a search term');
    }
}

async function displayFilterResults(results){

    document.querySelector('#search-results').innerHTML = '';
    document.querySelector('#pagination').innerHTML = '';
    document.getElementById('search-results-heading').innerHTML = ``;
    results.forEach(results => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<div class="card">
        <a href="movie-details.html?id=${results.id}">
            ${results.poster_path ? `<img
                src= "https://image.tmdb.org/t/p/w500/${results.poster_path}"
                class="card-img-top"
                alt="${globalState.search.type === 'movie' ? results.title:results.name}"
            />` : `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${globalState.search.type === 'movie' ? results.title : results.name}"
            />`}
        </a>
        <div class="card-body">
            <h5 class="card-title">${globalState.search.type === 'movie' ? results.title : results.name}</h5>
            <p class="card-text">
            <small class="text-muted">Release: ${globalState.search.type === 'movie' ? results.release_date : results.first_air_date}</small>
            </p>
        </div>
        </div>`;
        document.getElementById('search-results').appendChild(div);
    })
    displaySearchResultPages();
}

function displaySearchResultPages(){
    const div = document.createElement('div');
    div.classList.add('pagination');
    div.innerHTML = 
    `<button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${globalState.search.page} of ${globalState.search.totalPages}</div>`;

    document.getElementById('pagination').appendChild(div);

    if (globalState.search.page === 1) {
        document.querySelector("#prev").disabled = true;
    }
    if(globalState.search.page === globalState.search.totalPages){
        document.querySelector("#next").disabled = true;
    }
    document.querySelector('#next').addEventListener('click', async()=>{
        globalState.search.page++;
        const {results, total_pages} = await searchApiData();
        displayFilterResults(results);
    });
    document.querySelector('#prev').addEventListener('click', async()=>{
        globalState.search.page--;
        const {results, total_pages} = await searchApiData();
        displayFilterResults(results);
    });
}

function showspinner(){
    document.querySelector('.spinner').classList.add('show')
}

function hidespinner(){
    document.querySelector('.spinner').classList.remove('show')
}

async function fetchApi(url) {
    const API_KEY = globalState.apiKey.apiKey;
    const API_URL = globalState.apiKey.apiUrl;
    showspinner();
    const response = await fetch(`${API_URL}${url}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    hidespinner();
    return data;
}
async function searchApiData(url) {
    const API_KEY = globalState.apiKey.apiKey;
    const API_URL = globalState.apiKey.apiUrl;
    showspinner();
    const response = await fetch(`${API_URL}search/${globalState.search.type}?api_key=${API_KEY}&language=en-US&query=${globalState.search.term}&page=${globalState.search.page}`);
    const data = await response.json();
    hidespinner();
    return data;
}

function highlightActiveTab() {
    const highlightTab = document.querySelectorAll('.nav-link');
    highlightTab.forEach(link => {
        if (link.getAttribute('href') === globalState.currentPage) {
            link.classList.add('active');
        }
    });
}

function displayAlert(message, className = 'error'){
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert',className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);
    setTimeout(() => alertEl.remove(), 3000);
}

function initializeApp() {
    switch (globalState.currentPage) {
        case '/':
        case '/index.html':
            displaySliderShow();
            displayPopularMovies();
            break;
        case '/shows.html':
            displayTvShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case '/search.html':
            search();
            break;

    }
    highlightActiveTab()
}

document.addEventListener('DOMContentLoaded', initializeApp);
