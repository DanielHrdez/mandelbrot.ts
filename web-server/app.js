#!/usr/bin/env node

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Daniel Hernandez de Leon
 * @since April 05 2022
 * @desc Web Server
 */

'use strict';

import express from 'express';

const app = express();
const port = 8080;

app.use(express.static('.'));
app.listen(port, '0.0.0.0', () => {
  console.log(`The server is running on http://10.6.131.165:${port}`);
});
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: '.'});
});
