#!/usr/bin/env node

const fs = require('fs');
const { argv, stdin } = require('process');

// Read package.json to get the version
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = packageJson.version;

// Function to evaluate a simple arithmetic expression
const evaluateExpression = (expression) => {
    const operators = ['+', '-', '*', '/', '%', '^'];

    // Splitting the expression into operands and operator
    let operator = '';
    for (const op of operators) {
        if (expression.includes(op)) {
            operator = op;
            break;
        }
    }
    const [operand1, operand2] = expression.split(operator).map(parseFloat);

    // Performing the operation based on the operator
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            if (operand2 === 0) return 'Division by zero';
            return operand1 / operand2;
        case '%':
            return operand1 % operand2;
        case '^':
            return Math.pow(operand1, operand2);
        default:
            return 'Invalid expression';
    }
};

// Function to evaluate more complex mathematical functions
const evaluateFunction = (expression) => {
    const functions = ['sqrt', 'sin', 'cos', 'tan', 'log', 'exp', 'abs', 'round', 'floor', 'ceil', 'factorial', 'gcd', 'lcm'];

    for (const func of functions) {
        if (expression.startsWith(func)) {
            const args = expression.slice(func.length + 1, -1).split(',').map(parseFloat);
            switch (func) {
                case 'sqrt':
                    return Math.sqrt(args[0]);
                case 'sin':
                    return Math.sin(args[0]);
                case 'cos':
                    return Math.cos(args[0]);
                case 'tan':
                    return Math.tan(args[0]);
                case 'log':
                    return Math.log10(args[0]);
                case 'exp':
                    return Math.exp(args[0]);
                case 'abs':
                    return Math.abs(args[0]);
                case 'round':
                    return Math.round(args[0]);
                case 'floor':
                    return Math.floor(args[0]);
                case 'ceil':
                    return Math.ceil(args[0]);
                case 'factorial':
                    return factorial(args[0]);
                case 'gcd':
                    return gcd(args[0], args[1]);
                case 'lcm':
                    return lcm(args[0], args[1]);
                default:
                    return 'Invalid expression';
            }
        }
    }

    return 'Invalid expression';
};

// Function to calculate factorial
const factorial = (n) => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
};

// Function to calculate greatest common divisor (GCD)
const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
};

// Function to calculate least common multiple (LCM)
const lcm = (a, b) => {
    return (a * b) / gcd(a, b);
};

// Function to display usage instructions
const displayHelp = () => {
    console.log('Usage: calctt [expression]');
    console.log('Example: calctt 2+3');
};

// Function to display version
const displayVersion = () => {
    console.log(`calctt Version: ${version}`);
};

// Extracting the expression from command line arguments
const args = argv.slice(2);
if (args.includes('-h') || args.includes('--help')) {
    displayHelp();
} else if (args.includes('-v') || args.includes('--version')) {
    displayVersion();
} else if (args.length === 0) {
    // If no arguments are provided, prompt the user to input an expression
    console.log('Welcome to Calctt! Please enter an expression:');
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', (data) => {
        const expression = data.trim();
        if (expression === 'exit') {
            console.log('Exiting Calctt.');
            process.exit();
        } else {
            console.log(evaluateExpression(expression) || evaluateFunction(expression));
        }
    });
} else {
    const expression = args.join(' ');
    console.log(evaluateExpression(expression) || evaluateFunction(expression));
}
