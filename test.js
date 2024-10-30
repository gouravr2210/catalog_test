const fs = require('fs');

function parseInput(filename) {
    const data = JSON.parse(fs.readFileSync(filename));
    const { n, k } = data.keys;
    const points = Object.entries(data)
        .filter(([key, _]) => key !== "keys")
        .map(([x, { base, value }]) => [parseInt(x), parseInt(value, base)]);
    return { n, k, points };
}

function lagrangeInterpolation(points) {
    const k = points.length;
    let constant = 0;
    for (let i = 0; i < k; i++) {
        let [xi, yi] = points[i];
        let term = yi;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let [xj, _] = points[j];
                term *= xj / (xj - xi);
            }
        }
        constant += term;
    }
    return Math.round(constant);
}

function findSecret(filename) {
    const { n, k, points } = parseInput(filename);
    if (points.length < k) {
        throw new Error("Not enough points to reconstruct the polynomial.");
    }
    const constantTerm = lagrangeInterpolation(points.slice(0, k));
    console.log(`The constant term (c) is: ${constantTerm}`);
}
