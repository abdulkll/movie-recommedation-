const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
const results = document.getElementById("results");

searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const searchTerm = searchBar.value;
	searchMovies(searchTerm);
});

async function searchMovies(searchTerm) {
	const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=YOUR_API_KEY`);
	const data = await response.json();

	if (data.Response === "True") {
		results.innerHTML = "";
		data.Search.forEach((movie) => {
			const movieCard = document.createElement("div");
			movieCard.classList.add("movie-card");
			movieCard.innerHTML = `
				<img src="${movie.Poster}">
				<h2>${movie.Title}</h2>
				<p>Year: ${movie.Year}</p>
				<p>Type: ${movie.Type}</p>
			`;
			results.appendChild(movieCard);
		});
	} else {
		results.innerHTML = `<p>No results found for "${searchTerm}"</p>`;
	}
}

