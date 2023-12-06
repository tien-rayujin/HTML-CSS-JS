const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imgList = ['./images/pic1.jpg', './images/pic2.jpg', './images/pic3.jpg', './images/pic4.jpg', './images/pic5.jpg']

/* Declaring the alternative text for each image file */
const altList = ['Closeup of a human eye', 'lava', 'flower', 'acient', 'butterfly']

/* Looping through images */
for (let i = 0; i < imgList.length; i++) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', imgList[i]);
  newImage.setAttribute('alt', altList[i]);
  thumbBar.appendChild(newImage);
}

// bubbling event
thumbBar.addEventListener('click', (event) => {
  displayedImage.src = event.target.src
})

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
  const statusClass = btn.getAttribute('class')

  if (statusClass === 'dark') {
    btn.setAttribute('class', 'light')
    btn.textContent = 'Lighten'
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)'
  } else {
    btn.setAttribute('class', 'dark')
    btn.textContent = 'Darken'
    overlay.style.backgroundColor = 'rgba(0,0,0,0)'
  }
})