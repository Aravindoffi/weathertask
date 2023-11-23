let d = document.getElementById("display");

const key = "f88a6df76b361c90f4a0b80861e4f1f4";

let createCard = (header, body) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.margin = "10px";
    card.style.backgroundColor = "black";
    card.innerHTML = `${header.outerHTML}${body.outerHTML}`;
    return card;
};

let createHeader = (name) => {
    const header = document.createElement("div");
    header.classList.add("card-header");
    header.style.backgroundColor = "black";
    header.style.color = "white";
    header.innerHTML = `<p>Name: ${name}</p>`;
    return header;
};

let createBody = (flag, capital, region, cca3, lat, lon) => {
    const body = document.createElement("div");
    body.classList.add("card-body");
    body.style.backgroundColor = "mistyrose";
    body.style.color = "black";
    body.innerHTML = `
        <img src="${flag}" alt="${name} Flag" style="max-width: 100px; height: auto;">
        <p>Capital: ${capital}</p>
        <p>Region: ${region}</p>
        <p>Country Code: ${cca3}</p>
        <button type="button" class="btn btn-primary card-img-top" onclick="btn(${lat},${lon})"> Click for Weather</button>
    `;
    return body;
};

let btn = (lat, lon, name) => {
    const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    const ur = fetch(weather)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert(
                `${data.weather[0].main}
                 ${data.weather[0].description}
                `
            );
        });
};

fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
        // Construct HTML content for all countries
        const htmlContent = data
            .map((country) => {
                const name = country.name.common;
                const flag = country.flags.svg;
                const capital = country.capital;
                const region = country.region;
                const cca3 = country.cca3;
                const lat = country.latlng[0];
                const lon = country.latlng[1];

                // Create header and body dynamically
                const header = createHeader(name);
                const body = createBody(flag, capital, region, cca3, lat, lon, name);

                // Create card dynamically
                const card = createCard(header, body);

                return card.outerHTML;
            })
            .join('');

        // Update the display element
        d.innerHTML = htmlContent;
    })
    .catch((error) => console.log(error));