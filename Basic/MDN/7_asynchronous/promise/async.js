
// async function always return a Promise
async function fetchProducts() {
  try {
    // wait until fetch is settled
    // return value as fullied or throw error when rejected
    const response = await fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");

    if (!response.ok) {
      throw new Error(`Http error: ${response.status}`);
    }

    // wait until response.json() is settled
    // either return parsed json object as value or throw error
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Could not get products: ${error}`);
  }
}

const promise = fetchProducts();
promise.then((data) => console.log(data[0]));

// async/await helpfull when write promise chain when next operation depends on result of the lastone

// if not the case, then use Promise.all() will be more performant