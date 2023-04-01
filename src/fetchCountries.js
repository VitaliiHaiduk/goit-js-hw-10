const countryCard = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

export default class FetchCountries {

    constructor() {
        this.country = '';
    }

    fetchCountries() {
        const url = `https://restcountries.com/v3.1/name/${this.country}?fields=name,capital,population,flags,languages`;

        return fetch(url)
        .then(response => {
            if (response.status === 404) {
                throw new Error(response.status);
            }
            return  response.json()})
    }

    // countryListMarcup(response) {
    //     const listMarcup = response.map(({ name, flags }) => `<li>
    //                              <img src="${flags.svg}" alt="${name}" width="60" height="auto">
    //                              <span>${name.official}</span>
    //                      </li>`).join('');

    //   countryList.innerHTML = listMarcup;
    //   return listMarcup
    //  }

   

    get searchCountry() {
        return this.country;
      }
    
      set searchCountry(newCountry) {
        this.country = newCountry;
      }
}

