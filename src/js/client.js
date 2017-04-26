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
    // .done( score => {
    //   // console.log(score.medium)
    //
    //   function deleteMedia() {
    //     // $('.dispose').remove();
    //   }
    //   function addMedia() {
    //     console.log(score.medium)
    //     $('<div class="dispose"></div>').appendTo($('.wrapper'));
    //     score.medium.forEach(media => {
    //       $('.dispose').append($(`<div class="col s4" data-target="${media.id}"><div class="voteContainer"><a href="/media/${media.id}"><img id="image" src="${media.images}"/></a><p class="upVote" data-target="${media.id}"></p><p class="textScore" id="${media.id}score"><p class="downVote" data-target="${media.id}"></p>`));
    //     });
    //   }
    //   deleteMedia();
    //   addMedia();
    //   console.log('sucess', score.medium.score);
    // })
    .fail(err => {
      return(`Error: ${err}`);
    });
  });

  $('.downVote').on('click', function(e){
    const scoreCounter = $(e.target).attr('data-target');
    let score = $(`#${scoreCounter}score`).text();
    score --;
    $(`#${scoreCounter}score`).text(score);
    $.post(`${window.location.origin}/media/${scoreCounter}`, { score });
  });
  $('.carousel').carousel();
  autoplay();
  function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 4000);
  }
}

function getMedium(query) {
  $
  .get(`http://www.omdbapi.com/?t=${query}`)
  .done(data => {
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
    return(`Error: ${err}`);
  });
}
