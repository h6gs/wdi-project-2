console.log('hello world');

$(init);
let query;

function init() {
  $('#searchMedia').on('submit', function(e) {
    e.preventDefault();
    query = $('input').val();
    getMedium(query);
  });
}

function getMedium(query) {
  $
  .get(`http://www.omdbapi.com/?t=${query}`)
  .done(data => {
    console.log(data);
    $('#imdbName').val(data.Title);
    $('#imdbReleased').val(data.Released);
    $('#imdbGenre').val(data.Genre);
    $('#imdbPoster').val(data.Poster);
    $('#imdbPlot').val(data.Plot);
    const img = $('<img />', {
      id: 'thumb',
      src: data.Poster
    });
    $('img').remove();
    img.prependTo($('.container'));
  })
  .fail(err => {
    console.log(`Error: ${err}`);
  });
}

// $('#imdbName').blur(getMedium(query));
