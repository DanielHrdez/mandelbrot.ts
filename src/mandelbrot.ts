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

import {Complex} from './complex';

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
  constructor(maxIterations: number = 100) {
    this.maxIterations = maxIterations;
  }

  /**
   * @desc String representation of the mandelbrot set
   * @return {string} - string representation of the mandelbrot set
   */
  public toString(): string {
    return `Max iterations: ${this.maxIterations}`;
  }

  /**
   * @desc Calculates the mandelbrot set
   * @param {Complex} complex - complex number
   * @return {number} - number of iterations
   */
  private calculate(complex: Complex): number {
    let result = complex;
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
    this.calculatePixels(imageData!.data, canvas.width);
    context?.putImageData(imageData!, 0, 0);
  }

  /**
   * @desc Calculates each pixel of the mandelbrot set
   * @param {Uint8ClampedArray} pixels - pixels
   * @param {number} width - width
   */
  private calculatePixels(pixels: Uint8ClampedArray, width: number) {
    const channels = 4;
    for (let i = 0; i < pixels!.length; i += channels) {
      const complex = new Complex(i, i % (channels * width));
      const result = this.calculate(complex);
      const color = this.hueToRgba(result);
      pixels![i] = color[0];
      pixels![i + 1] = color[1];
      pixels![i + 2] = color[2];
      pixels![i + 3] = color[3];
    }
  }

  /**
   * @desc Change a color number to his RGBA representation
   * @param {number} hue - color
   * @return {number[]} - RGBA representation
   */
  private hueToRgba(hue: number): number[] {
    const maxRGBA = 255;
    // use cosine of hue to get a smoother gradient
    const red = Math.cos((hue + 2 / 3) * Math.PI);
    const green = Math.cos((hue) * Math.PI);
    const blue = Math.cos((hue - 2 / 3) * Math.PI);
    return [
      Math.round(red * maxRGBA),
      Math.round(green * maxRGBA),
      Math.round(blue * maxRGBA),
      maxRGBA,
    ];
  }
}
