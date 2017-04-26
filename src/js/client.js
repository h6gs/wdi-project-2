$(init);
let query;

function init() {


  $('#searchMedia')
  .on('submit', function(e) {
    e.preventDefault();
    query = $('input').val();
    getMedium(query);
  });

  $('.upVote').on('click', function(e){
    const scoreCounter = $(e.target).attr('data-target');
    let score = $(`#${scoreCounter}score`).text();
    score++;
    $(`#${scoreCounter}score`).text(score);
    $.post(`${window.location.origin}/media/${scoreCounter}`, { score });
  });

  $('.downVote').on('click', function(e){
    const scoreCounter = $(e.target).attr('data-target');
    let score = $(`#${scoreCounter}score`).text();
    score --;
    $(`#${scoreCounter}score`).text(score);
    $.post(`${window.location.origin}/media/${scoreCounter}`, { score });
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
