import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

import FetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;


const countryName = document.querySelector('input#search-box');
const countryCard = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

const fetchApiCountries = new FetchCountries();

countryName.addEventListener('input', debounce(onSearcsCountryInput, DEBOUNCE_DELAY));

function onSearcsCountryInput (event) {
   const searchCountry = event.target.value.trim();

   if (!searchCountry) {
     hiddenCountries;
     return
   };

   fetchApiCountries.searchCountry = searchCountry;
   fetchApiCountries.fetchCountries()
   .then(foundedContries)
   .catch(notFoundedContries);

};

function foundedContries (response) {
    hiddenCountries ();

    if (response.length > 10) {
        Notify.info('Too many matches found. Please, enter a more specific name.');
        return;
    } else if (response.length <= 10 && response.length >= 2) {
        
        countryListMarcup(response);
    } else if (response.length === 1) {
        countryCardMarkup(response)
    }
      
}

function countryListMarcup(response) {
    const listMarcup = response.map(({ name, flags }) => `<li class="countryList">
                             <img src="${flags.svg}" class="countryList" alt="${name}" width="50" height="auto">
                             <span>${name.official}</span>
                     </li>`).join('');

  countryList.innerHTML = listMarcup;
  return listMarcup
 };

 function countryCardMarkup(response) {
    const countryMarcup = response.map(({ flags, name, capital, population, languages }) => {
                languages = Object.values(languages).join(", ");
                return `
                    <img src="${flags.svg}" alt="${name}" width="60" height="auto"><span>${name.official}</span>
                    <p>Capital: <span> ${capital}</span></p>
                    <p>Population: <span> ${population}</span></p>
                    <p>Languages: <span> ${languages}</span></p>`;
            }).join('');

  countryCard.innerHTML = countryMarcup;
  return countryMarcup
 };

function notFoundedContries() {
    hiddenCountries ();
    Notify.failure('Oops, there is no country with that name');
}


function hiddenCountries () {
    countryCard.innerHTML = '';
    countryList.innerHTML = '';
   }