import crypto from "crypto";

const key = crypto.randomBytes(192 / 8);
const iv = crypto.randomBytes(128 / 8);
const algorithm = "aes192";
const encoding = "hex";

const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  cipher.update(text);
  return cipher.final(encoding);
};

const decrypt = (encrypted: string) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.update(encrypted, encoding);
  return decipher.final("utf8");
};

const content = "Hello Node.js";
const crypted = encrypt(content);
console.log(crypted);

// db75f3e9e78fba0401ca82527a0bbd62

const decrypted = decrypt(crypted);
console.log(decrypted);

// Hello Node.js
