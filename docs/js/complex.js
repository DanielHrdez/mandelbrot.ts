export class Complex {
    constructor(real = 0, complex = 0) {
        this.real = real;
        this.complex = complex;
    }
    toString() {
        if (this.complex >= 0) {
            return `${this.real} + ${this.complex}i`;
        }
        return `${this.real} - ${-this.complex}i`;
    }
    add(complex) {
        return new Complex(this.real + complex.real, this.complex + complex.complex);
    }
    sub(complex) {
        return new Complex(this.real - complex.real, this.complex - complex.complex);
    }
    mul(complex) {
        return new Complex(this.real * complex.real - this.complex * complex.complex, this.real * complex.complex + this.complex * complex.real);
    }
    div(complex) {
        const divisor = complex.real ** 2 + complex.complex ** 2;
        return new Complex((this.real * complex.real + this.complex * complex.complex) / divisor, (this.complex * complex.real - this.real * complex.complex) / divisor);
    }
    abs() {
        return (this.real * this.real + this.complex * this.complex) ** 0.5;
    }
    conj() {
        return new Complex(this.real, -this.complex);
    }
}
