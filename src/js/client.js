console.log('hello world');

$(init);
let query;



function init() {
  $('#searchMedia').on('submit', function(e) {
    e.preventDefault();
    query = $('input').val();
    console.log(query);
    getMedium(query);
  });
}

function getMedium(query) {
  $
  .get(`http://www.omdbapi.com/?t=${query}`)
  .done(data => {
    console.log(data);
  })
  .fail(err => {
    console.log(`Error: ${err}`);
  });
}

// $('#imdbName').blur(getMedium(query));
