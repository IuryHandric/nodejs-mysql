const express = require('express');
const router = express.Router();
const conn = require('../db')

router.get('/', (req, res) => {
    res.render('home')
})

// INSERT - VERBO POST

router.post('/books/insertbook', (req, res) => {

    const title = req.body.title;
    const pageqty = req.body.pagesqty;

    const sqlInsert = `INSERT INTO books (title, pages) VALUES ('${title}', '${pageqty}')`

    conn.query(sqlInsert, (err) => {
        if (err) {
            console.log(err)
        }
        console.log(`Novo livro enviado ao banco de Dados: ${title}, com ${pageqty} páginas.`)

        res.redirect('/books');
    })

})

// SELECT - VERBO READ

router.get('/books', (req, res) => {
    const sqlSelect = "SELECT * FROM books";

    conn.query(sqlSelect, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const books = data

        console.log(books)

        res.render('books', { books })

    })
})

router.get('/books/:id', (req, res) => {
    const id = req.params.id
    const sqlWhere = `SELECT * FROM books where id = ${id}`

    conn.query(sqlWhere, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        // Pegando a posição do primeiro registro
        const book = data[0];

        res.render('book', { book })

    })
})

router.get('/books/edit/:id', (req, res) => {
    const id = req.params.id;

    const sqlEdit = `SELECT * FROM books WHERE id = ${id}`

    conn.query(sqlEdit, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        const book = data[0]
        res.render('editbook', { book });
    })

})

module.exports = router;