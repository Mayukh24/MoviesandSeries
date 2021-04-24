
//Barba Page Transitions
barba.init({
    views:[{
        namespace: "home"
    },
    {
        namespace: "movies"
    },
    {
        namespace: "series"
    }        
    ]
});



//Form Part for movies.html and series.html





let IndividualId = sessionStorage.getItem('movieId');


//HERE


  window.location = 'wishlist.html';
  return false;