const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US&page=1&query='
const SEARCH_SAPI = 'https://api.themoviedb.org/3/search/tv?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US&page=1&query='


const cinemas = document.getElementById('cinema-s')
const tvs = document.getElementById('tv-series-s')
const form = document.getElementById('form')
const form1 = document.getElementById('form1')
const search = document.getElementById('search')
const reloadtButton = document.querySelector("logo");


function myFunction() {
    location.replace("search.html")
  }


async function getSMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showSMovies(data.results)
}

function showSMovies(movies) {
    cinemas.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, overview, id } = movie

        var summary = overview.split(' ').slice(0,10).join(' ');

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <a onclick = "movieSelected('${id}')" href = "#"><img src="${IMG_PATH + poster_path}" alt="${title}" ></a>
        <a onclick = "movieSelected('${id}')" href = "#">
            <div class="overview">
                <h3>${title}</h3>
                ${summary}...
            </div>
        </a>
        `
        cinemas.appendChild(movieEl)
    })
}


async function getSSeries(url) {
    const res = await fetch(url)
    const data = await res.json()

    showSSeries(data.results)
}

function showSSeries(series) {
    tvs.innerHTML = ''

    series.forEach((tv) => {
        const { name, poster_path, overview ,id} = tv

        var summary = overview.split(' ').slice(0,10).join(' ');

        const tvEl = document.createElement('div')
        tvEl.classList.add('tv')

        tvEl.innerHTML = `
        <a onclick = "tvSelected('${id}')" href = "#"><img src="${IMG_PATH + poster_path}" alt="${name}" ></a>
        <a onclick = "tvSelected('${id}')" href = "#">
            <div class="overview">
                <h3>${name}</h3>
                ${summary}...
            </div>
        </a>
        `
        tvs.appendChild(tvEl)
    })
}






//SUBMIT
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value
        if(searchTerm && searchTerm !== '') {
            getSMovies(SEARCH_API + searchTerm)
            getSSeries(SEARCH_SAPI + searchTerm)

        } else {
            window.location.reload()
        }
    
   

})




//NEW PART SESSION STORAGE

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'individual.html';
    return false;
}

function getIndividual(){
    let IndividualId = sessionStorage.getItem('movieId');
    const URLInd = `https://api.themoviedb.org/3/movie/${IndividualId}?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US`;
    axios.get(URLInd)
    .then((response)=>{
        let movie = response.data;

        console.log(movie);
        const { title, poster_path, overview, genres, release_date, vote_average, imdb_id, run_time, production_companies, status} = movie



        
        /*var genre = setGenres(genres);
        function setGenres(e){
            e.forEach(genre =>{
                genre.name;
            })
        }
       
        console.log(genre);*/
        
        var gen = (genres.map(function(obj) {
            return obj.name;
        }).join(","));
        var prod = (production_companies.map(function(obj) {
            return obj.name;
        }).join(","));


        let output =`
        <div class="left">        
          <div class="image-dp">
            <img src="${IMG_PATH + poster_path}" class="thumbnail">
          </div>
          <div class="extra-info">
          <h2>Information</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Rating:</strong> ${vote_average}</li>
              <li class="list-group-item"><strong>Released:</strong> ${release_date}</li>
              <li class="list-group-item"><strong>Duration:</strong> ${run_time} mins</li>
              <li class="list-group-item"><strong>Status:</strong> ${status}</li>
              <li class="list-group-item"><strong>Produced by:</strong> ${prod}</li>
            </ul>
          </div>
        </div>
        <div class="right">
        
          <h1>${title}</h1>
          <p><strong>Genre:</strong> ${gen}</p>
          <hr>
          <div class="plot">
            <h3>Synopsis</h3>
            ${overview}
            <hr>
            <a href="http://imdb.com/title/${imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
          </div>
        </div>
      `;

        $('#movie-details').html(output);
    })
    .catch((err)=>{
        console.log(err);
    });   
}


//Series
function tvSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'individuals.html';
    return false;
}

function getIndividualS(){
    let IndividualId = sessionStorage.getItem('movieId');
    const URLInd = `https://api.themoviedb.org/3/tv/${IndividualId}?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US`;
    axios.get(URLInd)
    .then((response)=>{
        let movie = response.data;

        console.log(movie);
        const { name, poster_path, overview, genres, first_air_date, vote_average, imdb_id, backdrop_path, episode_run_time, status, number_of_seasons, production_companies} = movie

        var gen = (genres.map(function(obj) {
            return obj.name;
        }).join(","));

        var prod = (production_companies.map(function(obj) {
            return obj.name;
        }).join(","));



        var background = document.createElement("img");
        background = IMG_PATH + backdrop_path;



        let output =`
        <div class="left">        
          <div class="image-dp">
            <img src="${IMG_PATH + poster_path}" class="thumbnail">
          </div>
          <div class="extra-info">
          <h2>Information</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Rating:</strong> ${vote_average}</li>
              <li class="list-group-item"><strong>Released:</strong> ${first_air_date}</li>
              <li class="list-group-item"><strong>Duration:</strong> ${episode_run_time} mins per ep</li>
              <li class="list-group-item"><strong>Status:</strong> ${status}</li>
              <li class="list-group-item"><strong>Number of Seasons:</strong> ${number_of_seasons}</li>
              <li class="list-group-item"><strong>Produced by:</strong> ${prod}</li>
            </ul>
          </div>
        </div>
        <div class="right">
        
          <h1>${name}</h1>
          <p><strong>Genre:</strong> ${gen}</p>
          <hr>
          <div class="plot">
            <h3>Synopsis</h3>
            ${overview}
            <hr>
          </div>
        </div>
      `;
      
      $('#movie-details').html(output);
      

    })
    .catch((err)=>{
        console.log(err);
    });   
}



