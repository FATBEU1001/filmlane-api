const nowPlayingBox = document.querySelector("#nowplaying .list");
const upComingBox = document.querySelector("#upcoming .list");
const topRatedBox = document.querySelector("#toprated .list");
const tvSeriBox = document.querySelector("#tvseri .list");
async function homeRender() {
    const dataNowPlaying = await getDataAPI(`${API_LINK}movie/now_playing?${API_KEY}&language=en-US&page=1`);
    renderList(dataNowPlaying.results, nowPlayingBox);

    const dataUpComing = await getDataAPI(`${API_LINK}movie/upcoming?${API_KEY}&language=en-US&page=1`);
    renderList(dataUpComing.results, upComingBox);

    const dataTopRated = await getDataAPI(`${API_LINK}movie/top_rated?${API_KEY}&language=en-US&page=1`);
    renderList(dataTopRated.results, topRatedBox);

    const dataTvSeri = await getDataAPI(`${API_LINK}tv/popular?${API_KEY}&language=en-US&page=1`);
    renderList(dataTvSeri.results, tvSeriBox);
    console.log(dataTvSeri);
}
homeRender();

function getIDUrl() {
    let url = window.location.href;
    let searchParams = new URLSearchParams(url);
    let movieId = searchParams.get("type");
    return movieId;
}
//XỬ LÝ DOM
window.addEventListener("scroll", function () {
    var header = document.querySelector(".header");
    if (window.pageYOffset > 100) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
});
