const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US&page=1&query='
const SEARCH_SAPI = 'https://api.themoviedb.org/3/search/tv?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US&page=1&query='


const cinemas = document.getElementById('cinema-s')
const tvs = document.getElementById('tv-series-s')
const form = document.getElementById('form')
const form1 = document.getElementById('form1')
const search = document.getElementById('search')
const reloadtButton = document.querySelector("logo");
const tagsEl = document.getElementById("tags");
const cinemaw = document.getElementById('cinema-w')
const seriesw = document.getElementById('tv-series-w')
const a = document.querySelector('.addList');



const navSlide = ()=>{
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', ()=>{
    nav.classList.toggle('nav-active');
  });

  //Animation
  navLinks.forEach((link, index)=>{
    link.style.animation = `navLinkFade 0.5s ease forwards ${index/5 + 1}s`;
  });
}

navSlide();

function setGenre(){
  tagsEl.innerHTML = '';
  genres.forEach(genre => {
    const t = document.createElement('select');
    t.classList.add('tag');
    t.id = genre.id;
    t.innertext = genre.name;
    tagsEl.append(t);
  })
}

var n;
var l;
var mId;
var mIdS;
var background;


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
        movieEl.classList.add('movie1')

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
        tvEl.classList.add('tv1')

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
      console.log(response.data);
        let movie = response.data;
        const { title, poster_path, overview, genres, release_date, vote_average, imdb_id, run_time, backdrop_path, production_companies, status, id, runtime} = movie

        console.log(`http://imdb.com/title/${imdb_id}`);
       
        n = ifItIncludes(id);
        mId = id;
        
        background = IMG_PATH + backdrop_path;
        console.log(background);

        $(document).ready(function() {
          $("body").css("background-image", `url(${background})`)
          .css("background-repeat", "no-repeat");
      })


        
        var gen = (genres.map(function(obj) {
            return obj.name;
        }).join(","));
        var prod = (production_companies.map(function(obj) {
            return obj.name;
        }).join(","));
        let output;  

        output =`
        <div class="left">        
          <div class="image-dp">
            <img src="${IMG_PATH + poster_path}" class="thumbnail">
          </div>
          <div class = "info">
            <h1>${title}</h1>
            <p><strong>Genre:</strong> ${gen}</p>
          <hr>
          </div>
          <div class="extra-info">
          <h2>Information</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Rating : </strong><i class="fas fa-star"></i> ${vote_average}</li>
              <li class="list-group-item"><strong>Released : </strong> ${release_date}</li>
              <li class="list-group-item"><strong>Duration : </strong> ${runtime} mins</li>
              <li class="list-group-item"><strong>Status : </strong> ${status}</li>
              <li class="list-group-item"><strong>Produced by : </strong> ${prod}</li>
            </ul>
          </div>
        </div>
        <div class="right">
        <div class = "info-right">
        <h1>${title}</h1>
          <p><strong>Genre:</strong> ${gen}</p>
          <hr>
        </div>          
          
          <div class="plot">
            <h2>Synopsis</h2>
            ${overview}
            <hr>
          </div>
          <div class="life">
            <button onclick="location.href='http://imdb.com/title/${imdb_id}'" class="btn btn-primary">View IMDB</button>
            <button id="button-s" class="btn btn-primary" onclick="chooseM()">Add or Remove from Watchlist</button>
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
        const { name, poster_path, overview, genres, first_air_date, vote_average, imdb_id, backdrop_path, episode_run_time, status, number_of_seasons, production_companies, id} = movie

        console.log(id);

        l = ifItSIncludes(id);
        mIdS = id;

        var gen = (genres.map(function(obj) {
            return obj.name;
        }).join(","));

        var prod = (production_companies.map(function(obj) {
            return obj.name;
        }).join(","));

        n = ifItIncludes(id);
        mId = id;

        background = IMG_PATH + backdrop_path;
        console.log(background);

        $(document).ready(function() {
          $("body").css("background-image", `url(${background})`)
          .css("background-repeat", "no-repeat");
      })



        let output =`
        <div class="left">        
          <div class="image-dp">
            <img src="${IMG_PATH + poster_path}" class="thumbnail">
          </div>
          <div class="extra-info">
          <h2>Information</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Rating : </strong><i class="fas fa-star"></i> ${vote_average}</li>
              <li class="list-group-item"><strong>Released : </strong> ${first_air_date}</li>
              <li class="list-group-item"><strong>Duration : </strong> ${episode_run_time} mins per ep</li>
              <li class="list-group-item"><strong>Status : </strong> ${status}</li>
              <li class="list-group-item"><strong>Number of Seasons : </strong> ${number_of_seasons}</li>
              <li class="list-group-item"><strong>Produced by : </strong> ${prod}</li>
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
          <div class = "life">          
            <button id="button-s" class="btn btn-primary" onclick="chooseS()">Add or Remove from Watchlist</button>
          </div>
        </div>
      `;
      
      $('#movie-details').html(output);

    })
    .catch((err)=>{
        console.log(err);
    });   
}




/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////LOCAL STORAGE///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function wishSelected(id){
  let makId;
  if(localStorage.getItem('makId')==null){
    makId = [];
  }
  else{
    makId = JSON.parse(localStorage.getItem('makId'));
  }
  makId.push(id);
  localStorage.setItem("makId", JSON.stringify(makId));
}

function wishUnSelected(id){
  if(localStorage.getItem('makId')==null){
    makId = [];
  }
  else{
    makId = JSON.parse(localStorage.getItem('makId'));
  }
  const indexofId = makId.indexOf(id);
  makId.splice(indexofId, 1);
  localStorage.setItem("makId", JSON.stringify(makId));
}



function getWishMovie(){
  if(localStorage.getItem('makId')==null){
    makId = [];
  }
  else{
    makId = JSON.parse(localStorage.getItem('makId'));
  }
  makId.forEach((newMovie) => {
    const URLInd = `https://api.themoviedb.org/3/movie/${newMovie}?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US`;
    axios.get(URLInd)
    .then((response)=>{
        movie = response.data;


        const { title, poster_path, overview, id } = movie

        var summary = overview.split(' ').slice(0,10).join(' ');

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie1')
        


        movieEl.innerHTML = `
            <a onclick = "movieSelected('${id}')" href = "#"><img src="${IMG_PATH + poster_path}" alt="${title}" >
            </a>
            <a onclick = "movieSelected('${id}')" href = "#">
                <div class="overview">
                    <h3>${title}</h3>
                    ${summary}...
                </div>
            </a>
        `
        
        cinemaw.appendChild(movieEl)
    })
    .catch((err)=>{
        console.log(err);
    });   
  }

  )}
  

function ifItIncludes(id)
{
  let makId;
  if(localStorage.getItem('makId')==null){
    makId = [];
  }
  else{
    makId = JSON.parse(localStorage.getItem('makId'));
  }
  var m = makId.includes(id);
  return m;
}

function chooseM(){
  if(n === true){
    wishUnSelected(mId);
    alert("Removed from Watchlist");
    window.location.reload()
  }
  else{
    wishSelected(mId);
    alert("Added to Watchlist");
    window.location.reload()
  }
}



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////LOCAL STORAGE///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function wishSelectedS(id){
  let makSId;
  if(localStorage.getItem('makSId')==null){
    makSId = [];
  }
  else{
    makSId = JSON.parse(localStorage.getItem('makSId'));
  }
  makSId.push(id);
  localStorage.setItem("makSId", JSON.stringify(makSId));
}

function wishUnSelectedS(id){
  let makSId;
  if(localStorage.getItem('makSId')==null){
    makSId = [];
  }
  else{
    makSId = JSON.parse(localStorage.getItem('makSId'));
  }
  const indexofSId = makSId.indexOf(id);
  makSId.splice(indexofSId, 1);
  localStorage.setItem("makSId", JSON.stringify(makSId));
}



function getWishMovieS(){
  if(localStorage.getItem('makSId')==null){
    makSId = [];
  }
  else{
    makSId = JSON.parse(localStorage.getItem('makSId'));
  }
  makSId.forEach((newSeries) => {
    const URLInd = `https://api.themoviedb.org/3/tv/${newSeries}?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US`;
    axios.get(URLInd)
    .then((response)=>{
        movie = response.data;

        const { name, poster_path, overview, id } = movie

        var summary = overview.split(' ').slice(0,10).join(' ');

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie1')
        


        movieEl.innerHTML = `
            <a onclick = "tvSelected('${id}')" href = "#"><img src="${IMG_PATH + poster_path}" alt="${name}" >
            </a>
            <a onclick = "tvSelected('${id}')" href = "#">
                <div class="overview">
                    <h3>${name}</h3>
                    ${summary}...
                </div>
            </a>
        `
        
        seriesw.appendChild(movieEl)
    })
    .catch((err)=>{
        console.log(err);
    });   
  }

  )}
  

function ifItSIncludes(id)
{
  let makSId;
  if(localStorage.getItem('makSId')==null){
    makSId = [];
  }
  else{
    makSId = JSON.parse(localStorage.getItem('makSId'));
  }
  var l = makSId.includes(id);
  return l;
}

function chooseS(){
  if(l === true){
    wishUnSelectedS(mIdS);
    alert("Removed from Watchlist");
    window.location.reload()
  }
  else{
    wishSelectedS(mIdS);
    alert("Added to Watchlist");
    window.location.reload()
  }
}