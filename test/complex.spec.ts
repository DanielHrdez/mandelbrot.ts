/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Daniel Hernandez de Leon
 * @since April 10 2022
 * @desc Complex class Tests
 */

'use strict';

import {Complex} from '../src/complex';

describe('Complex class', () => {
  test('Complex class constructor should have a default value', () => {
    expect(new Complex()).toEqual(new Complex(0, 0));
  });

  test('Complex class constructor', () => {
    expect(new Complex(1, 2)).toEqual(new Complex(1, 2));
  });

  test('toString method', () => {
    expect(new Complex(1, 2).toString()).toEqual('1 + 2i');
  });

  test('add method', () => {
    expect(new Complex(1, 2).add(new Complex(3, 4)).toString())
        .toEqual('4 + 6i');
  });

  test('sub method', () => {
    expect(new Complex(1, 2).sub(new Complex(3, 4)).toString())
        .toEqual('-2 - 2i');
  });

  test('mul method', () => {
    expect(new Complex(1, 2).mul(new Complex(3, 4)).toString())
        .toEqual('-5 + 10i');
  });

  test('div method', () => {
    expect(new Complex(1, 2).div(new Complex(3, 4)).toString())
        .toEqual('0.44 + 0.08i');
  });

  test('abs method', () => {
    expect(new Complex(1, 2).abs()).toEqual(Math.sqrt(5));
  });

  test('conj method', () => {
    expect(new Complex(1, 2).conj().toString()).toEqual('1 - 2i');
  });
});
