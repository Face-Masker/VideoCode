const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyDpXhMed2TRhFUwDS1ffS36x-ZVnTb_1j8";
let maxResults = 50;
let search = "Html tamil";


let video_http = `https://www.googleapis.com/youtube/v3/search?key=${api_key}&type=video&part=snippet&maxResults=${maxResults}&q=${search}`;
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http)
    .then(res => res.json())
    .then(data => {
        data.items.forEach(item => {
            getChannelIcon(item);
        })
    })
    .catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
            key: api_key,
            part: 'snippet',
            id: video_data.snippet.channelId
        }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
        })
}

const makeVideoCard = (data) => {
        videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
            </div>
        </div>
    </div>
    `;
    }
    // <img src="${data.channelThumbnail}" class="channel-icon" alt="">
    // <p class="channel-name">${data.snippet.channelTitle}</p>

// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if (searchInput.value.length) {
        location.href = searchLink + searchInput.value;
    }
})