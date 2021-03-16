const express = require("express")
const app = express()
const cors = require("cors")
const axios = require("axios")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.get("/", (req, res) => {
  res.send("Server is running")
})

app.get("/food", (req, res) => {
  let cat = 'Seafood'
  if (req.query.category) {
    cat = req.query.category
  }
  axios(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    .then(({data}) => {
      res.status(200).json({
        meals: data.meals
      })
    })
    .catch(err => {
      res.status(500).json({
        err
      })
    })
})

module.exports = app