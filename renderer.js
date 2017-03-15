// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const cheerio = require('cheerio')

const wordInput = document.getElementById('input-word')
const resultContainer = document.getElementById('result')

const aboutHTML = `
  <div class="about">
    向开发者<a href="mailto:zhengguang1211@gmail.com">小余</a>反馈
  </div>
`

resultContainer.innerHTML = aboutHTML

wordInput.addEventListener('change', ({ target: { value } }) => {
  handleWordInputChange(value)
})

function handleWordInputChange(value) {
  if (value !== '') {
    resultContainer.innerText = '翻译中...'

    fetch(`http://youdao.com/w/eng/${value}/`)
    .then(res => res.text())
    .then(text => {
      let $ = cheerio.load(text)

      resultContainer.innerHTML
      = $('.trans-container').html().replace(/href="/g, 'target="_blank" href="http://youdao.com/w')
    })
  } else {
    resultContainer.innerHTML = aboutHTML
  }
}
