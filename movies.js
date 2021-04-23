const TAPI_URL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US&page=1'
const UAPI_URL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US&page=1'
const MAPI_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&page=1'


const cinema = document.getElementById('cinema')
const lcinema = document.getElementById('lcinema')
const ucinema = document.getElementById('ucinema')
const dcinema = document.getElementById('movie_details')






// Get initial movies

getMovies(MAPI_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    cinema.innerHTML = ''



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
        
        cinema.appendChild(movieEl)
    })
}

// Get upcoming movies
getUMovies(UAPI_URL)

async function getUMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showUMovies(data.results)
}

function showUMovies(umovies) {
    ucinema.innerHTML = ''

    umovies.forEach((lmovie) => {
        const { title, poster_path, overview, id } = lmovie

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
        ucinema.appendChild(movieEl)
    })
}

// Get top-rated movies
getLMovies(TAPI_URL)

async function getLMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showLMovies(data.results)
    console.log(data)
}

function showLMovies(lmovies) {
    lcinema.innerHTML = ''

    lmovies.forEach((lmovie) => {
        const { title, poster_path, overview, id } = lmovie

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
        lcinema.appendChild(movieEl)
    })
}


