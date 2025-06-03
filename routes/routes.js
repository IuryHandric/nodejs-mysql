const express = require('express');
const router = express.Router();
const conn = require('../db')

router.post('/books/insertbook', (req, res) => {

    const title = req.body.title;
    const pageqty = req.body.pagesqty;

    const sqlInsert = `INSERT INTO books (title, pages) VALUES ('${title}', '${pageqty}')`

    conn.query(sqlInsert, (err) => {
        if(err) {
            console.log(err)
        }
        console.log(`Novo livro enviado ao banco de Dados: ${title}, com ${pageqty} páginas.`)

        res.redirect('/');
    })

})

module.exports = router;