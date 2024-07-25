class StringCalculator {
    add(numbers) {
        if (!numbers) {
            return 0;
        }

        // Check for custom delimiter
        let delimiter = /,|\n/;
        if (numbers.startsWith('//')) {
            const parts = numbers.split('\n');
            delimiter = new RegExp(parts[0][2], 'g');
            numbers = parts.slice(1).join('\n');
        }

        const numsArray = numbers.split(delimiter).map(num => parseInt(num, 10));
        const negatives = numsArray.filter(num => num < 0);

        if (negatives.length) {
            throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
        }

        return numsArray.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
    }
}

// Testing the StringCalculator class
const calculator = new StringCalculator();

console.log(calculator.add("")); // Output: 0
console.log(calculator.add("1")); // Output: 1
console.log(calculator.add("1,5")); // Output: 6
console.log(calculator.add("1\n2,3")); // Output: 6
console.log(calculator.add("//;\n1;2"));/ Output: 3

try {
    console.log(calculator.add("1,-2,3")); // Should throw an exception
} catch (e) {
    console.log(e.message); // Output: Negative numbers not allowed: -2
}

try {
    console.log(calculator.add("//;\n1;-2;3")); // Should throw an exception
} catch (e) {
    console.log(e.message); // Output: Negative numbers not allowed: -2
}