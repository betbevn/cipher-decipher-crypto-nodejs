import crypto from "crypto";

const key = crypto.randomBytes(192 / 8);
const iv = crypto.randomBytes(128 / 8);
const algorithm = "aes192";
const encoding = "binary";

const encrypt = (text: any) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  cipher.update(text);
  return cipher.final(encoding);
};

const decrypt = (encrypted: string) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.update(encrypted, encoding);
  return decipher.final("utf8");
};

const content = Buffer.from(JSON.stringify({ address: "aaaa", nonce: 123 }));
const crypted = encrypt(content);
console.log(crypted);

// b69a6b6ebceb1a64f21434e9185a9e0a

const decrypted = decrypt(crypted);
console.log(decrypted);

// I loved you!
