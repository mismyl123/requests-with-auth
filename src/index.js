
import $ from 'jquery';
console.log('DOM is loaded');
//declsrae user name variable. create a query string formatting function. Create fetch request and log the results.
const eventHandler = function (){
$('#search').submit(function(event){
  event.preventDefault();
  $('.error').empty(); //this will clear out any error messages when search is sugmitted again.
  console.log('search got submitted')
  getRepos($('.searchTerm').val());
  })
}
const formatQueryUrl = username =>
  `https://api.github.com/users/${username}/repos`
  //create headers object
//format the results into a list
function formatResults(responseJson) {
  let list = []
  responseJson.forEach(item => list.push(`
  <li>
    <a href="${item.url}">${item.name}</a>
  </li>
  `));
  return list.join('')
}
  // make fetch request and log the result
  const getRepos = username => fetch(formatQueryUrl(username))
  .then(function(response){
    if(response.ok) {
    return response.json()
  }
   throw new Error(response.statusText);
 })
  // log the results
  .then(responseJson => {
    console.log(responseJson);
    let repoList = formatResults(responseJson);
    $(`#form-results`).html(repoList);
    })
    .catch(error => {
      $('.error').text(`Error: ${error.message}`)
    })
    ;
  function main() {
  eventHandler()
}
$(main);