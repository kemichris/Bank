import crypto from 'crypto';

//Generates a valid 16-digit card number using the Luhn Algorithm
export const generateCardNumber = () => {
    // Mastercard prefix (you can later randomize Visa, Verve, etc.)
    const prefix = '5399';

    // Generate the first 15 digits
    let cardNumber = prefix;

    while (cardNumber.length < 15) {
        cardNumber += crypto.randomInt(0, 10);
    }

    // Calculate the Luhn check digit
    const digits = cardNumber.split('').map(Number);

    let sum = 0;
    let shouldDouble = true;

    // Start from the right-most digit
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];

        if (shouldDouble) {
            digit *= 2;

            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    const checkDigit = (10 - (sum % 10)) % 10;

    return cardNumber + checkDigit;
};

// Generates a random 3-digit CVV
export const generateCVV = () => {
    return crypto.randomInt(100, 1000).toString();
};

// Generates a card expiry date
export const generateExpiryDate = (yearsValid = 4) => {
    const today = new Date();

    const expiryMonth = crypto.randomInt(1, 13);

    const expiryYear = today.getFullYear() + yearsValid;

    return {
        expiryMonth,
        expiryYear
    };
};

// Check card expiration 
export const isCardExpired = (expiryMonth, expiryYear) => {
    const now = new Date();

    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    return (
        expiryYear < currentYear ||
        (expiryYear === currentYear &&
            expiryMonth < currentMonth)
    );
};