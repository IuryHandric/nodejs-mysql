const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})


conn.connect((err) => {

    if (err) {
        console.log(err)
    }
    console.log('Conectou ao Mysql!')
    app.listen(3000, () => console.log('Servidor rodadndo na porta http://localhost:3000'))

})


