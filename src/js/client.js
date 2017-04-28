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
    $.post(`${window.location.origin}/media/${scoreCounter}`, { score })
    .fail(err => {
      return(`Error: ${err}`);
    });
  });

  $('.downVote').on('click', function(e){
    const scoreCounter = $(e.target).attr('data-target');
    let score = $(`#${scoreCounter}score`).text();
    score --;
    $(`#${scoreCounter}score`).text(score);
    $.post(`${window.location.origin}/media/${scoreCounter}`, { score })
    .fail(err => {
      return(`Error: ${err}`);
    });
  });

  $('.carousel').carousel();
  autoplay();
  function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 4000);
  }
  $('.button-collapse').sideNav();
}

function getMedium(query) {
  $
  .get(`http://www.omdbapi.com/?t=${query}`)
  .done(data => {
    $('#imdbName').val(data.Title);
    $('#imdbRating').val(data.imdbRating);
    $('#imdbReleased').val(data.Released);
    $('#imdbGenre').val(data.Genre);
    $('#imdbPoster').val(data.Poster);
    $('#imdbPlot').val(data.Plot);
    const img = $('<img />', {
      id: 'thumb',
      src: data.Poster
    });
    $('#thumb').remove();
    img.prependTo($('.container'));
  })
  .fail(err => {
    return(`Error: ${err}`);
  });
}
