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
  constructor(
      canvas: HTMLCanvasElement,
      maxIterations: number = 10000,
  ) {
    this.context = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;
    this.maxIterations = maxIterations;
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
        `  Max iterations: ${this.maxIterations}\n`;
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
    return this.maxIterations;
  }

  /**
   * @desc Draws the mandelbrot set on a canvas
   * @param {number} iterationsArea - iterations of the area
   */
  public draw(iterationsArea: number): void {
    const imageData = this.context?.getImageData(0, 0, this.width, this.height);
    const imageDataResult = this.calculatePixels(imageData!.data);
    this.context?.putImageData(imageDataResult, 0, 0);
    const [area, error] = this.calculateArea(iterationsArea);
    const maxDecimals = 1e6;
    this.context.font = '40px Josefin Sans';
    this.context?.fillText(
        `Area: ${Math.round(area * maxDecimals) / maxDecimals}`,
        10,
        40,
    );
    this.context?.fillText(
        `Error: ${Math.round(error * maxDecimals) / maxDecimals}`,
        10,
        80,
    );
  }

  /**
   * @desc Calculates the area of the mandelbrot set
   * @param {number} maxIterationsArea - max iterations of the area
   * @return {[number, number]} - area and error
   */
  private calculateArea(maxIterationsArea: number): [number, number] {
    const randomComplexPoints = this.randomPoints(maxIterationsArea);
    let insidePoints = 0;
    randomComplexPoints.forEach((complexPoint) => {
      const result = this.calculate(complexPoint);
      if (result === this.maxIterations) insidePoints++;
    });
    const numberOfPoints = randomComplexPoints.length;
    const area = 5.625 * insidePoints / numberOfPoints;
    const error = area / (numberOfPoints ** 0.5);
    return [area, error];
  }

  /**
   * @desc Calculates random points in the interval [(-2.0, 0), (0.5, 1.125)]
   * @param {number} maxIterationsArea - max iterations of the area
   * @return {Complex[]} - array of random complex numbers
   */
  private randomPoints(maxIterationsArea: number): Complex[] {
    const randomComplex: Complex[] = [];
    for (let i = 0; i < maxIterationsArea; i++) {
      const realPart = Math.random() * -2.5 + 0.5;
      const imaginaryPart = Math.random() * 1.125;
      randomComplex.push(new Complex(realPart, imaginaryPart));
    }
    return randomComplex;
  }

  /**
   * @desc Calculates each pixel of the mandelbrot set
   * @param {Uint8ClampedArray} pixels - pixels
   * @return {ImageData} - image data
   */
  private calculatePixels(pixels: Uint8ClampedArray) {
    const channels = 4;
    const imageData = new ImageData(pixels, this.width, this.height);
    const ratio = 360 / this.maxIterations;
    const ratioWidth = 4 / this.width;
    const ratioHeight = 4 / this.height;
    const middleLength = pixels!.length / 2;
    for (let i = 0; i < middleLength; i += channels) {
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
    return this.mirror(imageData);
  }

  /**
   * @desc Mirrors the image data
   * @param {ImageData} imageData - image data
   * @return {ImageData} - image data mirrored
   */
  private mirror(imageData: ImageData): ImageData {
    const channels = 4;
    const widthHeight = this.width * this.height;
    const middleLength = widthHeight * 2;
    const pixelsLength = widthHeight * channels;
    const lenghtRow = this.width * channels;
    let row = lenghtRow;
    let countRows = 2;
    for (let i = middleLength; i < pixelsLength; i += channels) {
      if (i % lenghtRow === 0) {
        row = lenghtRow * countRows;
        countRows += 2;
      }
      imageData.data[i] = imageData.data[i - row];
      imageData.data[i + 1] = imageData.data[i + 1 - row];
      imageData.data[i + 2] = imageData.data[i + 2 - row];
      imageData.data[i + 3] = imageData.data[i + 3 - row];
    }
    return imageData;
  }

  /**
   * @desc Change a color number to his RGBA representation
   * @param {number} hue - color
   * @return {number[]} - RGBA representation
   */
  private hueToRgb(hue: number): number[] {
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
