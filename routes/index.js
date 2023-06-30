const express = require('express');
const routesMaterial = require('./routesMaterial.js')
// const routesCategoria = require('./routesCategoria.js')

function routerApi(app){
    app.use('/material', routesMaterial);
    // app.use('/categoria', routesCategoria);
}

module.exports = routerApi;