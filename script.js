const search = document.getElementById('search');
const pagination = document.getElementById('pagination');
const songs = document.getElementById('songs');
const form = document.querySelector('.search-form');

form.addEventListener('submit', fetchHint);

songs.addEventListener('click', e => {
    var element = e.target;

    if(element.nodeName == "BUTTON" && element.classList.contains("lyrics-btn")) {
        const songInfo = e.path.find(item => {
            return item.classList.contains('lyrics-btn');
        })

        if(songInfo){
            const artistName = songInfo.getAttribute('data-artistName');
            const songTitle = songInfo.getAttribute('data-title');
            fetchLyrics(artistName,songTitle);
        }
    } else {
        return false;
    }
});



function fetchLyrics(artist, title){
    const lyricsApiUrl = 'https://api.lyrics.ovh/v1/' + artist + '/' + title;
    
    fetch(lyricsApiUrl)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);

        pagination.innerHTML = ``

        if(data.lyrics!==''){
            var formattedString = data.lyrics.replace(/(\r|\n)/g, '<br>');;
            songs.innerHTML =
                `<h1 class="lyrics-heading"><b>${artist}</b> - ${title}</h1>
                <p class="lyrics">${formattedString}</p>`
            } else {
                songs.innerHTML =
                `<h1 class="lyrics-heading">Song has no lyrics available</h1>`
            }
    }).catch(function(error) {
        console.log(error); 
      });
}



function fetchHint(e){
    e.preventDefault();
    songs.innerHTML = '';
    const queryValue = search.value;
    
    const api_Url = 'https://api.lyrics.ovh/suggest/' + queryValue;
    console.log(api_Url); 

    fetch(api_Url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        songs.innerHTML = data.data.map(song=> 
            `<div class="song">
                <h4 class="song-heading">${song.artist.name} -- ${song.title} ${song.artist.name}</h4>
                <button class="lyrics-btn" id="lyrics" data-artistName = "${song.artist.name}" data-title = "${song.title}">Show Lyrics</button>
            </div>
            `
        ).join('')

    })
    .catch(function(error) {
        console.log(error); 
      });
}


