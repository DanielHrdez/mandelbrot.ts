/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Daniel Hernandez de Leon
 * @since April 27 2022
 * @desc Mandelbrot class
 */

import {Complex} from './complejo.js';

/**
 * @class Mandelbrot
 * @desc Mandelbrot class
 */
export class Mandelbrot {
  private maxIterations: number;

  /**
   * @desc Mandelbrot class constructor
   * @param {number} maxIterations - max iterations
   */
  constructor(maxIterations: number) {
    this.maxIterations = maxIterations;
  }

  /**
   * @desc String representation of the mandelbrot set
   * @return {string} - string representation of the mandelbrot set
   */
  public toString(): string {
    return `Max iterations: ${this.maxIterations}\n`;
  }

  /**
   * @desc Calculates the mandelbrot set
   * @param {Complex} complex - complex number
   * @return {number} - number of iterations
   */
  private calculate(complex: Complex): number {
    let result = new Complex(0, 0);
    for (let i = 1; i <= this.maxIterations; i++) {
      result = result.mul(result).add(complex);
      if (result.abs() > 2) return i;
    }
    return this.maxIterations;
  }

  /**
   * @desc Draws the mandelbrot set on a canvas
   * @param {HTMLCanvasElement} canvas - canvas
   */
  public draw(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext('2d');
    const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData?.data;
    const channels = 4;
    const maxRGBA = 255;

    for (let i = 0; i < pixels!.length; i += channels) {
      const complex = new Complex(i, i % (channels * canvas.width));
      const result = this.calculate(complex);
      const color = result * maxRGBA / this.maxIterations;
      pixels![i] = color;
      pixels![i + 1] = color;
      pixels![i + 2] = color;
      pixels![i + 3] = maxRGBA;
    }

    context?.putImageData(imageData!, 0, 0);
  }
}
