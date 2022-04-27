import { Complex } from './complejo.js';
var Mandelbrot = (function () {
    function Mandelbrot(maxIterations) {
        this.maxIterations = maxIterations;
    }
    Mandelbrot.prototype.toString = function () {
        return "Max iterations: ".concat(this.maxIterations, "\n");
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
    Mandelbrot.prototype.draw = function (canvas) {
        var context = canvas.getContext('2d');
        var imageData = context === null || context === void 0 ? void 0 : context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData === null || imageData === void 0 ? void 0 : imageData.data;
        var channels = 4;
        var maxRGBA = 255;
        for (var i = 0; i < pixels.length; i += channels) {
            var complex = new Complex(i, i % (channels * canvas.width));
            var result = this.calculate(complex);
            var color = result * maxRGBA / this.maxIterations;
            pixels[i] = color;
            pixels[i + 1] = color;
            pixels[i + 2] = color;
            pixels[i + 3] = maxRGBA;
        }
        context === null || context === void 0 ? void 0 : context.putImageData(imageData, 0, 0);
    };
    return Mandelbrot;
}());
export { Mandelbrot };
