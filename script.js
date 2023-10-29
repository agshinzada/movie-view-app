const form = document.querySelector(".search-container");
const result = document.querySelector(".result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (e.target[0].value.trim() !== "") {
    getMovie(e.target[0].value);
  }
});

async function getMovie(value = "delibal") {
  try {
    let response = await fetch(
      `http://www.omdbapi.com/?t=${value}&apikey=${key}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      result.innerHTML = `
        <div class="details">
          <img src="${data.Poster}" alt="movieImg" />

          <div class="head">
          <h1>${data.Title}</h1>
            <div class="title">
                <p>${data.imdbRating}</p>
                <div class="params">
                <p>${data.Year}</p>
                <p>${data.Runtime}</p>
                <p>${data.Country}</p>
                </div>
                
            </div>
            <div class="category">
            ${data.Genre}
            </div>
          </div>
        </div>
        <div class="about">
        <div class="plot">
        <span>Plot</span>
        ${data.Plot}
        </div>
            <div class="cast">
            <span>Cast</span>
                ${data.Actors}
            </div>
            <div class="behind">
            <div class="director">
            <span>Director</span>
                ${data.Director}
            </div>
            <div class="writer">
            <span>Writer</span>
                ${data.Writer}
            </div>
            
            </div>
            
        </div>
        `;
    } else {
      result.innerHTML = `
        <p class="notFound">Movie not found</p>
        `;
    }
  } catch (error) {
    console.log(error);
  }
}
