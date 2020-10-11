'use strict'

const BASE_URL = 'https://api.github.com/'

const getResults= function(search, amount){
    fetch(`${BASE_URL}users/${search}/repos?per_page=${amount}`)
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText);
            }
            return response.json()
        })
        .then(data => {
            console.log(data);
            generateData(data);
        })
        .catch(error => {
            $('#js-error').html(error.message)
            $('#results-list').empty();
        });
};


const generateData = (data) => {
    $('#js-error').empty();
    $('#results-list').html(data.map(row => `${row.name}<br/>${row.url}<hr/>`))
}

const handleSearch = function(){
    $('.js-form').on('submit', function(e) {
        e.preventDefault();
        const search = $('#js-search').val()
        const amount =$('#js-max-search').val();
        getResults(search, amount);
        $('#js-search').val('');
        $('#js-max-search').val(1);
        console.log("hi, foo!")
    });
};

$(handleSearch);