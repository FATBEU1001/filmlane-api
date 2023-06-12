//XỬ LÝ DOM
const modal = document.querySelector(".modal");
const closeIcon = document.querySelectorAll(".modal .close");
function showVideo() {
    modal.classList.add("active");
}
closeIcon.forEach((element) => {
    element.addEventListener("click", function () {
        modal.classList.remove("active");
    });
});
modal.addEventListener("click", function (e) {
    if (e.target == e.currentTarget) {
        modal.classList.remove("active");
    }
});

//XỬ LÝ API
async function renderDetailMovie() {
    const id = getIDUrl();
    //Lấy data detail
    const API_DETAIL = `${API_LINK}movie/${id}?${API_KEY}`;
    const dataDetail = await getDataAPI(API_DETAIL);

    //Show data detail
    const boxDetail = document.querySelector(".detail");
    boxDetail.style.backgroundImage = `linear-gradient(to top, #111d1ded, #111d1ded),url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${dataDetail.backdrop_path})`;
    boxDetail.innerHTML = `<div class="container align-item-center">
        <div class="img">
            <img src="https://image.tmdb.org/t/p/w500${dataDetail.poster_path}" alt="${dataDetail.title}" />
        </div>
        <div class="content">
            <h1>${dataDetail.title}</h1>
            <div class="align-item-center">
                <div class="date">${dataDetail.release_date}</div>
                <ul class="type">
                    ${dataDetail.genres.map((genres) => `<li>${genres.name}</li>`)}
                </ul>
                <div class="time"><i class="fa-regular fa-clock"></i> ${dataDetail.runtime}</div>
            </div>
            <div class="align-item-center mrt30">
                <div class="rate"><span>${dataDetail.vote_average.toFixed(1)}%</span> user score</div>
                <div class="play" id="playtrailer" onclick="showVideo()">
                    <span><i class="fa-solid fa-play"></i></span> <span>Play trailer</span>
                </div>
            </div>
            <div class="minidesc">${dataDetail.tagline}</div>
            <div class="desc">
                <h3>Overview</h3>
                <p>${dataDetail.overview}</p>
            </div>
        </div>
    </div>`;

    //Lấy danh sách diễn viên
    const API_ACTOR = `${API_LINK}movie/${id}/credits?${API_KEY}`;
    const dataActor = await getDataAPI(API_ACTOR);
    const boxListCast = document.querySelector(".list-cast .list");
    dataActor.cast.forEach((cast) => {
        boxListCast.innerHTML += `<div class="card">
            <img src="https://image.tmdb.org/t/p/w200${cast.profile_path}" alt="" />
            <h3>${cast.name}</h3>
            <p>${cast.character}</p>
        </div>`;
    });

    //Lấy video trailer
    const API_VIDEO = `${API_LINK}movie/${id}/videos?${API_KEY}`;
    const dataVideo = await getDataAPI(API_VIDEO);
    const trailer = dataVideo.results.find((item) => item.type == "Trailer");
    modal.querySelector(".modal-body").innerHTML = `<iframe
        width="100%"
        height="500"
        src="https://www.youtube.com/embed/${trailer.key}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
    ></iframe>`;
}
renderDetailMovie();
