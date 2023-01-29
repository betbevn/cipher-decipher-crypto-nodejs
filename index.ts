import crypto from "crypto";

const algorithm = "SHA256";

// Create a private key
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

// Convert string to buffer
const data = Buffer.from("0xf4b3776934B012CEe7317171b1BA1A0BfdAA51e6");

// Sign the data and returned signature in buffer
const sign = crypto.sign(algorithm, data, privateKey);
console.log(sign, "A");

// Convert returned buffer to base64
const signature = sign.toString("base64");

// Printing the signature
console.log(`Signature:\n\n ${signature}`);

console.log(Buffer.from(signature, "base64"), "B");

// Verifying signature using crypto.verify() function
const isVerified = crypto.verify(algorithm, data, publicKey, sign);

// Printing the result
console.log(`Is signature verified: ${isVerified}`);
