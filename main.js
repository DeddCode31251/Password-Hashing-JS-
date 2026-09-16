// Password Security

/*
When handling passwords, it's critical to use specialized password hashing functions that are designed to be computationally expensive to prevent brute-force attacks.

Here's why simple hashed are insufficient.

Never store passwords in plain text or simple hashed like MD5 or SHA-1
These can be easily cracked using rainbow tables or brute-forces attacks.

Key Concepts for Password Security:

 - Salting: add a unique random value to each password before hashing
 - Key Stretching: Make the hashing process intentionally slow to prevent brute-force attacks
 - Work Factor: Control how computationally intensive the hashing process is.
 
Here's how to properly hash passwords in nodejs

What is a Salt?

it's combined with the password before hashing to ensure that even if two users have the same password, their hashed will be different.
This prevents attackers from using precomputed tables (like rainbow tables) to crack multiple passwords at once.

*/

const crypto = require('crypto');

// Function to hash a password
function hashPassword(password) {
    // Generate a random salt (16 bytes)
    const salt = crypto.randomBytes(16).toString('hex');
    
    // Use scrypt for password hashing (recommended)
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    
    // Return both salt and hash for storage
    return { salt,hash };
}

// Function to verify a password
function verifyPassword(password, salt, hash) {
    const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');
    return hashedPassword === hash;
}

// add args
const Args = process.argv.slice(2); 
console.log('Password: ', Args[0]);
console.log('Wrong Password: ', Args[1]);

// Example usage
const password = Args[0];

// Hash the password for storage
const { salt,hash } = hashPassword(password);
console.log('Salt:',salt);
console.log('Hash:',hash);

// Verify login Attempt
const isValid = verifyPassword(password, salt, hash);
console.log('Password Valid:', isValid);

const isInValid = verifyPassword(Args[1], salt, hash);
console.log('Wrong Password valid:', isInValid)
