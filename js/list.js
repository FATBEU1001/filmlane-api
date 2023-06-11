function getIDUrl() {
    let url = window.location.href;
    let searchParams = url.split("=");
    return searchParams[1];
}
//SHOW DANH SÁCH MOVIE
const listmovie = document.querySelector("#listmovie .list");
const buttonMore = document.querySelector("#showmore");
let page = 1;
async function showListMovie(page = 1) {
    let type = getIDUrl();
    const dataListMovie = await getDataAPI(`${API_LINK}discover/${type}?${API_KEY}&page=${page}`);
    renderList(dataListMovie.results, listmovie);
}
showListMovie();
buttonMore.addEventListener("click", () => {
    page++;
    showListMovie(page);
});
