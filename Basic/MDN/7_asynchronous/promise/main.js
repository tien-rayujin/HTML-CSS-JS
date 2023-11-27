const fetchPromise = fetch("fail-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");

fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Http error: ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    console.log(data[0]);
  })
  .catch((error) => {
    console.error(`Could not get products: ${error}`);
  });





// promise all

const fetchPromise1 = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
const fetchPromise2 = fetch(
  "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
);
const fetchPromise3 = fetch(
  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
);

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
  .then((responses) => {
    // fullilled when all promise is fullifilled
    for (const response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
  })
  .catch((error) => {
    // rejected if one of promise rejected
    console.error(`Failed to fetchh: ${error}`);
  });

Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
  .then((responses) => {
    // fullilled when any promise is fullifilled
    console.log(`${response.url}: ${response.status}`);
  })
  .catch((error) => {
    // rejected if one of promise rejected
    console.error(`Failed to fetchh: ${error}`);
  });