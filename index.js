const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const routersPublics = require('./routes/routes')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// Para conseguir pegar os dados do body
app.use(
    express.urlencoded({
        extended: true
    })
)

// Para ler em JSON
app.use(express.json());

app.use('/', routersPublics);

app.listen(3000, () => console.log('Servidor rodadndo na porta http://localhost:3000'))


