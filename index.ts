import fs from "fs";
import {
  getPublicKeyFromPem,
  getPrivateKeyFromPem,
  makeKeyPair,
  KeyPair,
} from "./crypto.util";

// Solution 1: Create public/private keys pair via openssl

// First: Generate private key: openssl ecparam -name prime256v1 -genkey -noout -out private.pem
// After: Generate public key: openssl ec -in private.pem -pubout -out public.pem

// Encrypt
const publicKeyPem = fs.readFileSync("public.pem", "utf8");
const publicKeyFromPem = getPublicKeyFromPem(publicKeyPem);
const encryptedData = publicKeyFromPem.encrypt("Royal", "RSAES-PKCS1-V1_5");

console.log("-------------PublicKey Pem-------------\n", publicKeyPem, "\n");
console.log("-------------Public Key-------------\n", publicKeyFromPem, "\n");
console.log("-------------Encrypted Data-------------\n", encryptedData, "\n");

// Decrypt
const privateKeyPem = fs.readFileSync("private.pem", "utf8");
const privateKeyFromPem = getPrivateKeyFromPem(privateKeyPem);
const decryptedData = privateKeyFromPem.decrypt(
  encryptedData,
  "RSAES-PKCS1-V1_5"
);

console.log("-------------PrivateKey Pem-------------\n", privateKeyPem, "\n");
console.log("-------------Private Key-------------\n", privateKeyFromPem, "\n");
console.log("-------------Decrypted Data-------------\n", decryptedData, "\n");
// --------------------------------------------------------------------------------------//

// Solution 2: create public/private keys pair via "node-forge" module

const generateKeyPair = async () => {
  const { publicKey, privateKey }: KeyPair = await makeKeyPair();
  // Encrypt
  const encryptedDataWithPublicKey = publicKey.encrypt(
    "Royal",
    "RSAES-PKCS1-V1_5"
  );

  console.log("-------------Public Key-------------\n", publicKey, "\n");
  console.log(
    "-------------Encrypted Data-------------\n",
    encryptedDataWithPublicKey,
    "\n"
  );

  // Decrypt
  const decryptedDataWithPublicKey = privateKey.decrypt(
    encryptedDataWithPublicKey,
    "RSAES-PKCS1-V1_5"
  );

  console.log("-------------Private Key-------------\n", privateKey, "\n");
  console.log(
    "-------------Decrypted Data-------------\n",
    decryptedDataWithPublicKey,
    "\n"
  );
};

generateKeyPair();
