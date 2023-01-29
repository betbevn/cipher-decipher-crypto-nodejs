import forge from "node-forge";

export type PublicKey = forge.pki.PublicKey;
export type PrivateKey = forge.pki.PrivateKey;
export type RSAPrivateKey = forge.pki.rsa.PrivateKey;
export type RSAPublicKey = forge.pki.rsa.PublicKey;
export type GenerateKeyPairOptions = forge.pki.rsa.GenerateKeyPairOptions;
export type KeyPair = forge.pki.rsa.KeyPair;

const PKI = forge.pki;
const RSA = forge.pki.rsa;
const MD = forge.md;

export const generateKeyPair = (
  opts: GenerateKeyPairOptions
): Promise<KeyPair> =>
  new Promise((resolve, reject) => {
    RSA.generateKeyPair(opts, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

export const makeKeyPair = (): Promise<KeyPair> =>
  generateKeyPair({ bits: 2048 });

export const makePublicKeyPem = (publicKey: PublicKey) =>
  PKI.publicKeyToPem(publicKey);

export const makePrivateKeyPem = (privateKey: PrivateKey) =>
  PKI.privateKeyToPem(privateKey);

export const getPublicKeyFromPem = (pemPublicKey: string) =>
  PKI.publicKeyFromPem(pemPublicKey);

export const getPrivateKeyFromPem = (pemPrivateKey: string) =>
  PKI.privateKeyFromPem(pemPrivateKey);

export const encryptPrivateKey = (privateKey: PrivateKey, secret: string) =>
  PKI.encryptRsaPrivateKey(privateKey, secret);

export const decryptPrivateKey = (pemPrivateKey: string, secret: string) =>
  PKI.decryptRsaPrivateKey(pemPrivateKey, secret);

export const makeAuthSignature = (privateKey: RSAPrivateKey) => {
  const message = "Let me in";
  const md = MD.sha1.create();
  md.update(message, "utf8");
  const signature = privateKey.sign(md);
  return [message, signature];
};

export const verifyAuthSignature = async (
  publicKey: RSAPublicKey,
  message: string,
  signature: string
) => {
  const md = MD.sha1.create();
  md.update(message, "utf8");
  const verification = publicKey.verify(md.digest().getBytes(), signature);
  return verification;
};
