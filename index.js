const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

// Middleware
const ageVerify = (req, res, next) => {
  const { age } = req.query
  if (!age) return res.redirect('/')
  return next()
}

// Pages
app.get('', (req, res) => {
  return res.render('home')
})

app.get('/minor', ageVerify, (req, res) => {
  const { age } = req.query
  res.render('minor', { age })
})

app.get('/major', ageVerify, (req, res) => {
  const { age } = req.query
  res.render('major', { age })
})

// Post
app.post('/check', (req, res) => {
  const { age } = req.body

  if (age < 18) {
    res.redirect(`/minor?age=${age}`)
  } else {
    res.redirect(`/major?age=${age}`)
  }
})

app.listen(3000, () => {
  console.log('Servidor Online na porta 3000')
})
