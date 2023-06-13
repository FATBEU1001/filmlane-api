//SHOW DANH SÁCH MOVIE
const listmovie = document.querySelector("#listmovie .list");
const buttonMore = document.querySelector("#showmore");
const title = document.querySelector(".banner-2 h2");
const type = getIDUrl();
title.innerHTML = type[1] == "movie" ? "Movie" : "TV Shows";
let page = 1;
async function showListMovie(page = 1) {
    const dataListMovie = await getDataAPI(`${API_LINK}discover/${type[1]}?${API_KEY}&page=${page}`);
    console.log(dataListMovie);
    renderList(dataListMovie.results, listmovie);
}
showListMovie();
buttonMore.addEventListener("click", () => {
    page++;
    showListMovie(page);
});
