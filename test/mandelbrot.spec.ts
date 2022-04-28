/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Daniel Hernandez de Leon
 * @since April 27 2022
 * @desc Mandelbrot class test
 */

// import {Complex} from '../src/complex';
import {Mandelbrot} from '../src/mandelbrot';

const defaultIterations = 100;
// const defaultWidth = 100;
// const defaultHeight = 100;
// const maxRGBA = 255;

describe('Mandelbrot class', () => {
  test('Mandelbrot class constructor', () => {
    expect(new Mandelbrot(defaultIterations))
        .toEqual(new Mandelbrot(defaultIterations));
  });

  test('Mandelbrot class constructor with default value', () => {
    expect(new Mandelbrot()).toEqual(new Mandelbrot(defaultIterations));
  });

  test('Mandelbrot class toString method', () => {
    expect(new Mandelbrot(defaultIterations).toString())
        .toEqual('Max iterations: 100');
  });

  // test('Mandelbrot class calculate method on infinite casses', () => {
  //   const mandelbrot = new Mandelbrot(defaultIterations);
  //   expect(mandelbrot.calculate(new Complex(-1, 0)))
  //       .toEqual(defaultIterations);
  //   expect(mandelbrot.calculate(new Complex(0, 1)))
  //       .toEqual(defaultIterations);
  //   expect(mandelbrot.calculate(new Complex(0.2, -0.3)))
  //       .toEqual(defaultIterations);
  //   expect(mandelbrot.calculate(new Complex(0, 0)))
  //       .toEqual(defaultIterations);
  // });

  // test('Mandelbrot class calculate method on less than infinite', () => {
  //   const mandelbrot = new Mandelbrot(defaultIterations);
  //   expect(mandelbrot.calculate(new Complex(0.5, 0)))
  //       .toBeLessThan(defaultIterations);
  //   expect(mandelbrot.calculate(new Complex(0, 0.9)))
  //       .toBeLessThan(defaultIterations);
  //   expect(mandelbrot.calculate(new Complex(1, -0.1)))
  //       .toBeLessThan(defaultIterations);
  //   expect(mandelbrot.calculate(new Complex(-1, 0.5)))
  //       .toBeLessThan(defaultIterations);
  //   expect(mandelbrot.calculate(new Complex(1, 0)))
  //       .toBeLessThan(defaultIterations);
  // });

  // test('Mandelbrot class calculatePixels method', () => {
  //   const mandelbrot = new Mandelbrot(defaultIterations);
  //   const pixels = new Uint8ClampedArray(defaultWidth * defaultHeight * 4);
  //   mandelbrot.calculatePixels(pixels, defaultWidth);
  //   expect(pixels[0]).toEqual(maxRGBA);
  //   expect(pixels[1]).toEqual(maxRGBA);
  //   expect(pixels[2]).toEqual(maxRGBA);
  //   expect(pixels[3]).toEqual(maxRGBA);
  // });
});
