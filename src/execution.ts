/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Daniel Hernandez de Leon
 * @since April 27 2022
 * @desc Main execution of the Mandelbrot
 */

import {Mandelbrot} from './mandelbrot';

let iterations = 100;

const mandelbrot = new Mandelbrot(
    screen.width,
    screen.height,
    iterations,
    0,
    0,
);
