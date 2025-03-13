const button = document.querySelector('button');
button.addEventListener('click', () => {
    const countryName = document.querySelector('input').value.trim();
    const countryInfoDiv = document.querySelector('#countryInfo');
if (!countryName){
    countryInfoDiv.innerHTML = "<p> enter country name.</p>";
    return;
}
      fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Country not found");
            }
            return response.json();
        })
        .then(data => {
            const country = data[0];
            countryInfoDiv.innerHTML = `
                <h2>${country.name.common}</h2>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
            `;
        })
        .catch(error => {
             countryInfoDiv.innerHTML = "<h2>error - not found</h2>";
        });
});
