//SHOW DANH SÁCH MOVIE
const listmovie = document.querySelector("#listmovie .list");
async function showListMovie() {
    let keyword = getIDUrl();
    const dataListMovie = await getDataAPI(`${API_LINK}search/movie?${API_KEY}&query=${keyword}`);
    renderList(dataListMovie.results, listmovie);
}
showListMovie();
