var Complex = (function () {
    function Complex(real, complex) {
        this.real = real;
        this.complex = complex;
    }
    Complex.prototype.toString = function () {
        if (this.complex >= 0) {
            return "".concat(this.real, " + ").concat(this.complex, "i");
        }
        return "".concat(this.real, " - ").concat(-this.complex, "i");
    };
    Complex.prototype.add = function (complex) {
        return new Complex(this.real + complex.real, this.complex + complex.complex);
    };
    Complex.prototype.sub = function (complex) {
        return new Complex(this.real - complex.real, this.complex - complex.complex);
    };
    Complex.prototype.mul = function (complex) {
        return new Complex(this.real * complex.real - this.complex * complex.complex, this.real * complex.complex + this.complex * complex.real);
    };
    Complex.prototype.div = function (complex) {
        var divisor = Math.pow(complex.real, 2) + Math.pow(complex.complex, 2);
        return new Complex((this.real * complex.real + this.complex * complex.complex) / divisor, (this.complex * complex.real - this.real * complex.complex) / divisor);
    };
    Complex.prototype.abs = function () {
        return Math.pow((this.real * this.real + this.complex * this.complex), 0.5);
    };
    Complex.prototype.conj = function () {
        return new Complex(this.real, -this.complex);
    };
    return Complex;
}());
export { Complex };
