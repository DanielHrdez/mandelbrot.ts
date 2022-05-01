import { Complex } from './complex.js';
export class Mandelbrot {
    constructor(canvas, maxIterations = 100) {
        this.context = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.maxIterations = maxIterations;
        this.area = 0;
        this.pixelLenght = 1 / ((this.width * this.height) / 16);
        this.maxRgba = 255;
        this.RgbaPart = this.maxRgba / 60;
    }
    toString() {
        return 'Mandelbrot:\n' +
            `  Width: ${this.width}\n` +
            `  Height: ${this.height}\n` +
            `  Max iterations: ${this.maxIterations}\n` +
            `  Area: ${this.area}`;
    }
    calculate(complex) {
        let result = complex;
        for (let i = 1; i <= this.maxIterations; i++) {
            result = result.mul(result).add(complex);
            if (result.abs() > 2)
                return i;
        }
        this.area += this.pixelLenght;
        return this.maxIterations;
    }
    draw() {
        var _a, _b;
        const imageData = (_a = this.context) === null || _a === void 0 ? void 0 : _a.getImageData(0, 0, this.width, this.height);
        const imageDataResult = this.calculatePixels(imageData.data);
        (_b = this.context) === null || _b === void 0 ? void 0 : _b.putImageData(imageDataResult, 0, 0);
    }
    getArea() {
        return this.area;
    }
    calculatePixels(pixels) {
        const channels = 4;
        const imageData = new ImageData(pixels, this.width, this.height);
        const ratio = 360 / this.maxIterations;
        const ratioWidth = 4 / this.width;
        const ratioHeight = 4 / this.height;
        for (let i = 0; i < pixels.length; i += channels) {
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
    hueToRgb(hue) {
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
