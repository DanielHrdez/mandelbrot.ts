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

import {Complex} from './complex.js';

/**
 * @class Mandelbrot
 * @desc Mandelbrot class
 */
export class Mandelbrot {
  private maxIterations: number;
  private area: number;
  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private pixelLenght: number;
  private maxRgba: number;
  private RgbaPart: number;

  /**
   * @desc Mandelbrot class constructor
   * @param {HTMLCanvasElement} canvas - canvas
   * @param {number} maxIterations - max iterations
   */
  constructor(canvas: HTMLCanvasElement, maxIterations: number = 100) {
    this.context = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;
    this.maxIterations = maxIterations;
    this.area = 0;
    this.pixelLenght = 1 / ((this.width * this.height) / 16);
    this.maxRgba = 255;
    this.RgbaPart = this.maxRgba / 60;
  }

  /**
   * @desc String representation of the mandelbrot set
   * @return {string} - string representation of the mandelbrot set
   */
  public toString(): string {
    return 'Mandelbrot:\n' +
        `  Width: ${this.width}\n` +
        `  Height: ${this.height}\n` +
        `  Max iterations: ${this.maxIterations}\n` +
        `  Area: ${this.area}`;
  }

  /**
   * @desc Calculates the mandelbrot set
   * @param {Complex} complex - complex number
   * @return {number} - number of iterations
   */
  public calculate(complex: Complex): number {
    let result = complex;
    for (let i = 1; i <= this.maxIterations; i++) {
      result = result.mul(result).add(complex);
      if (result.abs() > 2) return i;
    }
    this.area += this.pixelLenght;
    return this.maxIterations;
  }

  /**
   * @desc Draws the mandelbrot set on a canvas
   */
  public draw(): void {
    const imageData = this.context?.getImageData(0, 0, this.width, this.height);
    const imageDataResult = this.calculatePixels(imageData!.data);
    this.context?.putImageData(imageDataResult, 0, 0);
  }

  /**
   * @desc Getter of the Area
   * @return {number} The area
   */
  public getArea(): number {
    return this.area;
  }

  /**
   * @desc Calculates each pixel of the mandelbrot set
   * @param {Uint8ClampedArray} pixels - pixels
   * @return {ImageData} - image data
   */
  public calculatePixels(pixels: Uint8ClampedArray) {
    const channels = 4;
    const imageData = new ImageData(pixels, this.width, this.height);
    const ratio = 360 / this.maxIterations;
    const ratioWidth = 4 / this.width;
    const ratioHeight = 4 / this.height;
    for (let i = 0; i < pixels!.length; i += channels) {
      const index = i / channels;
      const xPosition = index % this.width;
      const yPosition = Math.floor(index / this.width);
      const xCentered = xPosition * ratioWidth - 2;
      const yCentered = yPosition * ratioHeight - 2;
      const complex = new Complex(xCentered, yCentered);
      const result = this.calculate(complex);
      const color = this.hueToRgb(result * ratio);
      imageData.data[i] = color[0];
      imageData.data[i + 1] = color[1];
      imageData.data[i + 2] = color[2];
      imageData.data[i + 3] = this.maxRgba;
    }
    return imageData;
  }

  /**
   * @desc Change a color number to his RGBA representation
   * @param {number} hue - color
   * @return {number[]} - RGBA representation
   */
  public hueToRgb(hue: number): number[] {
    if (hue >= 0 && hue < 60) {
      return [this.maxRgba, hue * this.RgbaPart, 0];
    }
    if (hue >= 60 && hue < 120) {
      return [-this.RgbaPart * hue + 510, this.maxRgba, 0];
    }
    if (hue >= 120 && hue < 180) {
      return [0, this.maxRgba, (hue - 120) * this.RgbaPart];
    }
    if (hue >= 180 && hue < 240) {
      return [0, -this.RgbaPart * hue + 1020, this.maxRgba];
    }
    if (hue >= 240 && hue < 300) {
      return [(hue - 240) * this.RgbaPart, 0, this.maxRgba];
    }
    if (hue >= 300 && hue < 360) {
      return [this.maxRgba, 0, -this.RgbaPart * hue + 1530];
    }
    return [0, 0, 0];
  }
}
