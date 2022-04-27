/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Daniel Hernandez de Leon
 * @since April 10 2022
 * @desc Complex class
 */

/**
 * @desc Class that represents a complex number
 */
export class Complex {
  private real: number;
  private complex: number;

  /**
   * @desc Constructor of the class
   * @param {number} real Real part of the complex number
   * @param {number} complex Complex part of the complex number
   */
  constructor(real: number, complex: number) {
    this.real = real;
    this.complex = complex;
  }

  /**
   * @desc String representation of the complex number
   * @return {string}
   * String representation of the complex number
   */
  public toString(): string {
    if (this.complex >= 0) {
      return `${this.real} + ${this.complex}i`;
    }
    return `${this.real} - ${-this.complex}i`;
  }

  /**
   * @desc Addition of two complex numbers
   * @param {Complex} complex Complex number to add
   * @return {Complex} Result of the addition
   */
  public add(complex: Complex): Complex {
    return new Complex(
        this.real + complex.real,
        this.complex + complex.complex,
    );
  }

  /**
   * @desc Subtraction of two complex numbers
   * @param {Complex} complex Complex number to subtract
   * @return {Complex} Result of the subtraction
   */
  public sub(complex: Complex): Complex {
    return new Complex(
        this.real - complex.real,
        this.complex - complex.complex,
    );
  }

  /**
   * @desc Multiplication of two complex numbers
   * @param {Complex} complex Complex number to multiply
   * @return {Complex} Result of the multiplication
   */
  public mul(complex: Complex): Complex {
    return new Complex(
        this.real * complex.real - this.complex * complex.complex,
        this.real * complex.complex + this.complex * complex.real,
    );
  }

  /**
   * @desc Calculates the division of two complex numbers
   * @param {Complex} complex Complex number to divide
   * @return {Complex} Result of the division
   */
  public div(complex: Complex): Complex {
    const divisor = complex.real ** 2 + complex.complex ** 2;
    return new Complex(
        (this.real*complex.real + this.complex*complex.complex) / divisor,
        (this.complex*complex.real - this.real*complex.complex) / divisor,
    );
  }

  /**
   * @desc Returns the absolute value of the complex number
   * @return {number} Absolute value of the complex number
   */
  public abs(): number {
    return (this.real * this.real + this.complex * this.complex) ** 0.5;
  }

  /**
   * @desc Calculates the conjugate of the complex number
   * @return {Complex} Result of the conjugate
   */
  public conj(): Complex {
    return new Complex(this.real, -this.complex);
  }
}
