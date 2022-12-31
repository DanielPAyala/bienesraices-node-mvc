const formularioLogin = (req, res) => {
    res.render('auth/login', {
        autenticado: 'Hola mundo'
    })
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        autenticado: 'Hola mundo'
    })
}

export {
    formularioLogin,
    formularioRegistro
}