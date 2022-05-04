var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Complex } from './complex.js';
export class Mandelbrot {
    constructor(canvas, maxIterations = 10000) {
        this.context = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.maxIterations = maxIterations;
        this.pixelLenght = 1 / ((this.width * this.height) / 16);
        this.maxRgba = 255;
        this.RgbaPart = this.maxRgba / 60;
    }
    toString() {
        return 'Mandelbrot:\n' +
            `  Width: ${this.width}\n` +
            `  Height: ${this.height}\n` +
            `  Max iterations: ${this.maxIterations}\n`;
    }
    calculate(complex) {
        let result = complex;
        for (let i = 1; i <= this.maxIterations; i++) {
            result = result.mul(result).add(complex);
            if (result.abs() > 2)
                return i;
        }
        return this.maxIterations;
    }
    draw(iterationsArea) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const imageData = (_a = this.context) === null || _a === void 0 ? void 0 : _a.getImageData(0, 0, this.width, this.height);
            const imageDataResult = yield this.calculatePixels(imageData.data);
            (_b = this.context) === null || _b === void 0 ? void 0 : _b.putImageData(imageDataResult, 0, 0);
            this.calculateArea(iterationsArea);
        });
    }
    drawAreaError(area, error) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.context.fillStyle = '#FF0000';
            this.context.fillRect(0, 0, this.width / 2, this.height / 8);
            this.context.fillStyle = '#000000';
            const maxDecimals = 1e6;
            this.context.font = '40px Josefin Sans';
            (_a = this.context) === null || _a === void 0 ? void 0 : _a.fillText(`Area: ${Math.round(area * maxDecimals) / maxDecimals}`, 10, 40);
            (_b = this.context) === null || _b === void 0 ? void 0 : _b.fillText(`Error: ${Math.round(error * maxDecimals) / maxDecimals}`, 10, 80);
            yield this.sleep(0);
        });
    }
    calculateArea(maxIterationsArea) {
        return __awaiter(this, void 0, void 0, function* () {
            const randomComplexPoints = this.randomPoints(maxIterationsArea);
            const numberOfPoints = randomComplexPoints.length;
            const factor = 5.625 / numberOfPoints;
            const squareRoot = (numberOfPoints ** 0.5);
            const factorSquareRoot = factor / squareRoot;
            let area = factor;
            let error = area / squareRoot;
            let count = 0;
            for (const complexPoint of randomComplexPoints) {
                const result = this.calculate(complexPoint);
                if (result === this.maxIterations) {
                    area += factor;
                    error += factorSquareRoot;
                    if (count % 1e3 == 0)
                        yield this.drawAreaError(area, error);
                    count++;
                }
            }
            yield this.drawAreaError(area, error);
        });
    }
    randomPoints(maxIterationsArea) {
        const randomComplex = [];
        for (let i = 0; i < maxIterationsArea; i++) {
            const realPart = Math.random() * -2.5 + 0.5;
            const imaginaryPart = Math.random() * 1.125;
            randomComplex.push(new Complex(realPart, imaginaryPart));
        }
        return randomComplex;
    }
    sleep(milliseconds) {
        return new Promise((nothing) => setTimeout(nothing, milliseconds));
    }
    ;
    calculatePixels(pixels) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const channels = 4;
            const imageData = new ImageData(pixels, this.width, this.height);
            const ratio = 360 / this.maxIterations;
            const ratioWidth = 4 / this.width;
            const ratioHeight = 4 / this.height;
            const middleLength = pixels.length / 2;
            const maxRgba = 255;
            const minRgba = 0;
            const lenghtRow = this.width * channels * this.height * 0.01;
            for (let i = 0; i < middleLength; i += channels) {
                if (i % lenghtRow === 0) {
                    (_a = this.context) === null || _a === void 0 ? void 0 : _a.putImageData(imageData, 0, 0);
                    (_b = this.context) === null || _b === void 0 ? void 0 : _b.putImageData(yield this.mirror(imageData), 0, 0);
                    yield this.sleep(0);
                }
                const index = i / channels;
                const xPosition = index % this.width;
                const yPosition = Math.floor(index / this.width);
                const xCentered = xPosition * ratioWidth - 2;
                const yCentered = yPosition * ratioHeight - 2;
                if (xCentered < -2 || xCentered > 0.5 || yCentered < -1.125) {
                    imageData.data[i] = maxRgba;
                    imageData.data[i + 1] = minRgba;
                    imageData.data[i + 2] = minRgba;
                    imageData.data[i + 3] = maxRgba;
                }
                else {
                    const complex = new Complex(xCentered, yCentered);
                    const result = this.calculate(complex);
                    const color = this.hueToRgb(result * ratio);
                    imageData.data[i] = color[0];
                    imageData.data[i + 1] = color[1];
                    imageData.data[i + 2] = color[2];
                    imageData.data[i + 3] = this.maxRgba;
                }
            }
            return yield this.mirror(imageData);
        });
    }
    mirror(imageData) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
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
