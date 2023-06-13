//XỬ LÝ DOM
const modal = document.querySelector(".modal");
const closeIcon = document.querySelectorAll(".modal .close");
function showVideo() {
    modal.classList.add("active");
    showTrailer();
}
closeIcon.forEach((element) => {
    element.addEventListener("click", function () {
        modal.classList.remove("active");
        modal.querySelector(".modal-body").innerHTML = "";
    });
});
modal.addEventListener("click", function (e) {
    if (e.target == e.currentTarget) {
        modal.classList.remove("active");
        modal.querySelector(".modal-body").innerHTML = "";
    }
});

//XỬ LÝ API
const id = getIDUrl();
async function renderDetailMovie() {
    //Lấy data detail
    const API_DETAIL = `${API_LINK}${id[2]}/${id[1]}?${API_KEY}`;
    const dataDetail = await getDataAPI(API_DETAIL);
    console.log(dataDetail);
    //Show data detail
    const boxDetail = document.querySelector(".detail");
    boxDetail.style.backgroundImage = `linear-gradient(to top, #111d1ded, #111d1ded),url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${dataDetail.backdrop_path})`;
    boxDetail.innerHTML = `<div class="container align-item-center">
        <div class="img">
            <img src="https://image.tmdb.org/t/p/w500${dataDetail.poster_path}" alt="${dataDetail.title}" />
        </div>
        <div class="content">
            <h1>${dataDetail.title ? dataDetail.title : dataDetail.name}</h1>
            <div class="align-item-center">
                <div class="date">${dataDetail.release_date ? dataDetail.release_date : dataDetail.first_air_date}</div>
                <ul class="type">
                    ${dataDetail.genres.map((genres) => `<li>${genres.name}</li>`)}
                </ul>
                <div class="time"><i class="fa-regular fa-clock"></i> ${dataDetail.runtime}</div>
            </div>
            <div class="align-item-center mrt30">
                <div class="rate"><span>${dataDetail.vote_average.toFixed(1)}%</span> user score</div>
                ${
                    id[2] == "movie"
                        ? `<div class="play" id="playtrailer" onclick="showVideo()">
                <span><i class="fa-solid fa-play"></i></span> <span>Play trailer</span>
            </div>`
                        : ""
                }
            </div>
            <div class="minidesc">${dataDetail.tagline}</div>
            <div class="desc">
                <h3>Overview</h3>
                <p>${dataDetail.overview}</p>
            </div>
        </div>
    </div>`;

    //Lấy danh sách diễn viên
    const API_ACTOR = `${API_LINK}${id[2]}/${id[1]}/credits?${API_KEY}`;
    const dataActor = await getDataAPI(API_ACTOR);
    const boxListCast = document.querySelector(".list-cast .list");
    dataActor.cast.forEach((cast) => {
        boxListCast.innerHTML += `<div class="card">
            <img src="https://image.tmdb.org/t/p/w200${cast.profile_path}" alt="" />
            <h3>${cast.name}</h3>
            <p>${cast.character}</p>
        </div>`;
    });
}
renderDetailMovie();
async function showTrailer() {
    const API_VIDEO = `${API_LINK}movie/${id[1]}/videos?${API_KEY}`;
    const dataVideo = await getDataAPI(API_VIDEO);
    console.log(dataVideo);
    const trailer = dataVideo.results.find((item) => item.type == "Trailer");
    modal.querySelector(".modal-body").innerHTML = `<iframe
        width="100%"
        height="500"
        src="https://www.youtube.com/embed/${trailer.key}?autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
    ></iframe>`;
}
async function showReview() {
    const API_REVIEW = `${API_LINK}${id[2]}/${id[1]}/reviews?${API_KEY}`;
    const dataReview = await getDataAPI(API_REVIEW);
    const boxReview = document.querySelector(".list-review .list");

    dataReview.results.forEach((element) => {
        boxReview.innerHTML += `<div class="card">
        <div class="thumb"><img src="${element.author_details["avatar_path"] ? element.author_details["avatar_path"].substring(1) : ""}" alt="${element.author}" /></div>
        <div class="content">
            <h3>A review by ${element.author}</h3>
            <div class="info">Written by <span>${element.author}</span> on <span>${element.created_at}</span></div>
            <p>${element.content} </p>
            <span onclick="showMoreDesc(event)" class="more">Show more</span>
        </div>
    </div>`;
    });
}
showReview();
function showMoreDesc(event) {
    const parentElement = event.target.closest(".card");
    parentElement.querySelector("p").classList.toggle("show");
    if (event.target.innerHTML == "Show more") {
        event.target.innerHTML = "Hide";
    } else {
        event.target.innerHTML = "Show more";
    }
}
