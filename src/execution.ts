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

import {Mandelbrot} from './mandelbrot.js';

const initialIterations = 100;

const mandelbrot = new Mandelbrot(initialIterations);

/**
 * @desc execute the mandelbrot set on a canvas
 */
function execute(): void {
  const canvas = document.getElementById('mandelbrot') as HTMLCanvasElement;
  mandelbrot.draw(canvas);
}

window.onload = execute;
