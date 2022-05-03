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

window.onload = () => {
  const initialIterations = 200;
  const canvas = document.getElementById('mandelbrot') as HTMLCanvasElement;
  const mandelbrot = new Mandelbrot(canvas, initialIterations);
  mandelbrot.draw(initialIterations * 1e3);
};
