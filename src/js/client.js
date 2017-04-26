$(init);
let query;
// let scoreFig =
let score;


function init() {
  score = $('#textScore').text();
  console.log(score);
  $('#searchMedia')
  .on('submit', function(e) {
    e.preventDefault();
    query = $('input').val();
    getMedium(query);
  });

  $('#upVote').on('click', function(){
    score++;
    $('#textScore').text(score);
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id);
    $.post(`${window.location.origin}/media/${id}`, { score })
    .done(data => {
      console.log('success', data);
    })
    .fail(data => {
      console.log('fail', data);
    });
  });

  $('#downVote').on('click', function(){
    score --;
    $('#textScore').text(score);
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id);
    $.post(`${window.location.origin}/media/${id}`, { score });
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
