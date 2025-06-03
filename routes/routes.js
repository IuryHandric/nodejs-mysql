const express = require('express');
const router = express.Router();
const pool = require('../db')

router.get('/', (req, res) => {
    res.render('home')
})

// INSERT - VERBO CREATE

router.post('/books/insertbook', (req, res) => {

    const title = req.body.title;
    const pageqty = req.body.pagesqty;

    const sqlInsert = `INSERT INTO books (??, ??) VALUES (?,?)`
    const data = ['title', 'pages', title, pageqty]

    pool.query(sqlInsert, data, (err) => {
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

    pool.query(sqlSelect, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const books = data

        console.log(books)

        res.render('books', { books })

    })
})

// WHERE

router.get('/books/:id', (req, res) => {
    const id = req.params.id

    const sqlWhere = `SELECT * FROM books where ?? = ?`
    const data = ['id', id]

    pool.query(sqlWhere, data, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        // Pegando a posição do primeiro registro
        const book = data[0];

        res.render('book', { book })

    })
})

// FORMULÁRIO PARA EDIÇÃO

router.get('/books/edit/:id', (req, res) => {
    const id = req.params.id;

    const sqlEdit = `SELECT * FROM books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sqlEdit, data, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        const book = data[0]
        res.render('editbook', { book });
    })
})

// ATUALIZAR DADOS - VERBO UPDATE

router.post('/books/updatebook', (req, res) => {

    const id = req.body.id
    const title = req.body.title
    const pagesqty = req.body.pagesqty

    const sqlUpdate = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['title', title, 'pages', pagesqty, 'id', id]


    pool.query(sqlUpdate, data, (err) => {
        if(err) {
            console.log(err)
            return
        }

        console.log(`O livro foi editado.`)
        res.redirect('/books')
    })

})

// Deletando dados - VERBO DELETE

router.post('/books/remove/:id', (req, res) => {

    const id = req.params.id

    const sqlDelete = `DELETE FROM books WHERE ?? = ?`
    const data = ['id', id]

    pool.query(sqlDelete, data, (err) => {
        if(err) {
            console.log(err)
            return
        }

        res.redirect('/books');
    })


})


module.exports = router;