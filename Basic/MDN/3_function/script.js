const btn = document.querySelector('button')

btn.addEventListener('click', () => {
  displayMessage("Your inbox is almost full — delete some mails", "warning");
  displayMessage("Brian: Hi there, how are you today?", "chat");

})

function displayMessage(msgText = 'This is a message box', msgType = 'chat') {
  const body = document.body

  const panel = document.createElement('div')
  panel.setAttribute('class', 'msgBox')
  body.appendChild(panel)


  const msg = document.createElement('p')
  msg.textContent = msgText
  panel.appendChild(msg)

  const closeBtn = document.createElement('button')
  closeBtn.textContent = 'X'
  panel.appendChild(closeBtn)

  closeBtn.addEventListener('click', () => {
    panel.parentNode.removeChild(panel)
  })


  if (msgType === 'warning') {
    msg.style.backgroundImage = 'url(icons/warning.png)'
    panel.style.backgroundColor = 'red'
  } else if (msgType === 'chat') {
    msg.style.backgroundImage = 'url(icons/chat.png)'
    panel.style.backgroundColor = 'aqua'
  } else {
    msg.style.paddingLeft = '20px'
  }
}

