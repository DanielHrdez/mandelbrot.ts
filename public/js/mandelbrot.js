import { Complex } from './complejo';
var Mandelbrot = (function () {
    function Mandelbrot(width, height, maxIterations, xPosition, yPosition) {
        this.width = width;
        this.height = height;
        this.maxIterations = maxIterations;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }
    Mandelbrot.prototype.toString = function () {
        return '{\n' +
            "  Width: ".concat(this.width, "\n") +
            "  Height: ".concat(this.height, "\n") +
            "  Max iterations: ".concat(this.maxIterations, "\n") +
            "  X position: ".concat(this.xPosition, "\n") +
            "  Y position: ".concat(this.yPosition, "\n") +
            '}';
    };
    Mandelbrot.prototype.calculate = function (complex) {
        var result = new Complex(0, 0);
        for (var i = 1; i <= this.maxIterations; i++) {
            result = result.mul(result).add(complex);
            if (result.abs() > 2)
                return i;
        }
        return this.maxIterations;
    };
    return Mandelbrot;
}());
export { Mandelbrot };
