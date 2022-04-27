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

import {Complex} from './complejo';

/**
 * @class Mandelbrot
 * @desc Mandelbrot class
 */
export class Mandelbrot {
  private width: number;
  private height: number;
  private maxIterations: number;
  private xPosition: number;
  private yPosition: number;

  /**
   * @desc Mandelbrot class constructor
   * @param {number} width - width of the canvas
   * @param {number} height - height of the canvas
   * @param {number} maxIterations - max iterations
   * @param {number} xPosition - x position
   * @param {number} yPosition - y position
   */
  constructor(
      width: number,
      height: number,
      maxIterations: number,
      xPosition: number,
      yPosition: number,
  ) {
    this.width = width;
    this.height = height;
    this.maxIterations = maxIterations;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
  }

  /**
   * @desc String representation of the mandelbrot set
   * @return {string} - string representation of the mandelbrot set
   */
  public toString(): string {
    return '{\n' +
        `  Width: ${this.width}\n` +
        `  Height: ${this.height}\n` +
        `  Max iterations: ${this.maxIterations}\n` +
        `  X position: ${this.xPosition}\n` +
        `  Y position: ${this.yPosition}\n` +
        '}';
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
}
