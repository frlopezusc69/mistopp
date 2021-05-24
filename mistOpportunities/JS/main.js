const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner msg");

form.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = input.value;
});

const apiKey = "bd79be70e203a6b8e77ba682f3342f5f";
const inputVal = input.value;

const url = 'https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=imperial'

fetch(url).then(response => response.json())
    .then(data => {})
    .catch(() => {
        msg.textContent = "Please look up an ACTUAL city... or, check your spelling!";
    });

const { main, name, sys, weather } = data;
const icon = `https://openweathermap.org/img/wn/${
  weather[0]["icon"]
}@2x.png`;

const li = document.createElement("li");
li.classList.add("city");
const markup = `
  <h2 class="city-name" data-name="${name},${sys.country}">
    <span>${name}</span>
    <sup>${sys.country}</sup>
  </h2>
  <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup>
  </div>
  <figure>
    <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
    <figcaption>${weather[0]["description"]}</figcaption>
  </figure>
`;
li.innerHTML = markup;
list.appendChild(li);

msg.textContent = "";
form.reset();
input.focus();

const listItems = list.querySelectorAll(" .city");
const listItemsArray = Array.from(listItems);

if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
        let content = "";
        if (inputVal.includes(",")) {
            if (inputVal.split(",")[1].length > 2) {
                inputVal = inputVal.split(",")[0];
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            } else {
                content = el.querySelector(".city-name").dataset.name.toLowerCase();
            }
            return content == inputVal.toLowerCase
        }
    });

    if (filteredArray.length > 0) {
        msg.textContent = `You already know the weather for ${
          filteredArray[0].querySelector(".city-name span").textContent
        } ...otherwise be more specific by providing the country code as well 😉`;
        form.reset();
        input.focus();
        return;
    }
}