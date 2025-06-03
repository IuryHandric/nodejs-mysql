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
    // Mudar para placeholders
    const sqlInsert = `INSERT INTO books (title, pages) VALUES ('${title}', '${pageqty}')`

    pool.query(sqlInsert, (err) => {
        if (err) {
            console.log(err)
        }
        console.log(`Novo livro enviado ao banco de Dados: ${title}, com ${pageqty} páginas.`)

        res.redirect('/books');
    })

})

// SELECT - VERBO READ

router.get('/books', (req, res) => {
    // Mudar para placeholders
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
    // Mudar para placeholders
    const sqlWhere = `SELECT * FROM books where id = ${id}`

    pool.query(sqlWhere, (err, data) => {
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
    // Mudar para placeholders
    const sqlEdit = `SELECT * FROM books WHERE id = ${id}`

    pool.query(sqlEdit, (err, data) => {
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
    // Mudar para placeholders
    const sqlUpdate = `UPDATE books SET title = '${title}', pages = '${pagesqty}' WHERE id = ${id}`

    pool.query(sqlUpdate, (err) => {
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

    const sqlDelete = `DELETE FROM books WHERE id = ${id}`

    pool.query(sqlDelete, (err) => {
        if(err) {
            console.log(err)
            return
        }

        res.redirect('/books');
    })


})


module.exports = router;