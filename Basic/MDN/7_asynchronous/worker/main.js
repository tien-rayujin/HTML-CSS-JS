const worker = new Worker("./generate.js");



// when user click on generate prime
// send message commad to worker "generate" contain "quota"
document.querySelector("#generate").addEventListener("click", () => {
  const quota = document.querySelector("#quota").value;
  worker.postMessage({
    command: "generate",
    quota // quota: quota
  }
  );
});

// when worker send a message back to main thread
// update output box, include the number of prime that was generated
worker.addEventListener("message", (message) => {
  document.querySelector("#output").textContent = `Finish generate ${message.data} primes!`;
});

document.querySelector("#reload").addEventListener("click", () => {
  document.querySelector("#user-input").value = `Try typing in here immediately after pressing "Generate primes"`;
  window.location.reload();
});