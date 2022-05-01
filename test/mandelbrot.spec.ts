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

import {Complex} from '../src/complex';
import {Mandelbrot} from '../src/mandelbrot';

const defaultIterations = 100;
const canvas = document.createElement('canvas');

describe('Mandelbrot class', () => {
  test('Mandelbrot class constructor', () => {
    expect(new Mandelbrot(canvas, defaultIterations))
        .toEqual(new Mandelbrot(canvas, defaultIterations));
  });

  test('Mandelbrot class constructor with default value', () => {
    expect(new Mandelbrot(canvas))
        .toEqual(new Mandelbrot(canvas, defaultIterations));
  });

  test('Mandelbrot class toString method', () => {
    expect(new Mandelbrot(canvas, defaultIterations).toString())
        .toEqual(
            'Mandelbrot:\n' +
            `  Width: 300\n` +
            `  Height: 150\n` +
            `  Max iterations: ${defaultIterations}\n` +
            `  Area: 0`,
        );
  });

  test('Mandelbrot class calculate method on infinite casses', () => {
    const mandelbrot = new Mandelbrot(canvas, defaultIterations);
    expect(mandelbrot.calculate(new Complex(-1, 0)))
        .toEqual(defaultIterations);
    expect(mandelbrot.calculate(new Complex(0, 1)))
        .toEqual(defaultIterations);
    expect(mandelbrot.calculate(new Complex(0.2, -0.3)))
        .toEqual(defaultIterations);
    expect(mandelbrot.calculate(new Complex(0, 0)))
        .toEqual(defaultIterations);
  });

  test('Mandelbrot class calculate method on less than infinite', () => {
    const mandelbrot = new Mandelbrot(canvas, defaultIterations);
    expect(mandelbrot.calculate(new Complex(0.5, 0)))
        .toBeLessThan(defaultIterations);
    expect(mandelbrot.calculate(new Complex(0, 0.9)))
        .toBeLessThan(defaultIterations);
    expect(mandelbrot.calculate(new Complex(1, -0.1)))
        .toBeLessThan(defaultIterations);
    expect(mandelbrot.calculate(new Complex(-1, 0.5)))
        .toBeLessThan(defaultIterations);
    expect(mandelbrot.calculate(new Complex(1, 0)))
        .toBeLessThan(defaultIterations);
  });

  test('Mandelbrot class hueToRgb method', () => {
    const mandelbrot = new Mandelbrot(canvas, defaultIterations);
    expect(mandelbrot.hueToRgb(0)).toEqual([255, 0, 0]);
    expect(mandelbrot.hueToRgb(60)).toEqual([255, 255, 0]);
    expect(mandelbrot.hueToRgb(120)).toEqual([0, 255, 0]);
    expect(mandelbrot.hueToRgb(180)).toEqual([0, 255, 255]);
    expect(mandelbrot.hueToRgb(240)).toEqual([0, 0, 255]);
    expect(mandelbrot.hueToRgb(300)).toEqual([255, 0, 255]);
    expect(mandelbrot.hueToRgb(360)).toEqual([0, 0, 0]);
  });
});
