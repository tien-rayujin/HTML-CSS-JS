const button = document.querySelector("#set-alarm");
const output = document.querySelector("#output");
const name = document.querySelector("#name");
const delay = document.querySelector("#delay");

// function setAlarm() {
//   setTimeout(() => {
//     output.textContent = 'Wake up!!';
//   }, 1000);
// }

function alarm(person, delay) {
  // the function passed innto Promise() contructor is executor function
  // executor takes 2 argument which is a function

  return new Promise((resolve, reject) => {
    if (delay < 0) {
      // reject auto called if executor function throw error
      throw new Error("Alarm delay must not be nagative");
    }

    // define a asynchronous function
    // call resolve if asynchronous function is succeed
    // call reject when fail
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

// button.onclick = () => {
//   alarm(name.value, delay.value)
//     .then((message) => output.textContent = message)
//     .catch((error) => {
//       output.textContent = `Couldn't set alarm: ${error}`;
//     });
// };

button.addEventListener("click", async () => {
  try {
    const message = await alarm(name.value, delay.value);
    output.textContent = message;
  } catch (error) {
    output.textContent = `Couldn't set alarm: ${error}`;
  }
});