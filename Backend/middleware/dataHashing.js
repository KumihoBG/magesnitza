const crypto = require("crypto");
const algorithm = process.env.ALGORITHM;
const initVector = crypto.randomBytes(16);
const securityKey = Buffer.from(process.env.SECURITY_KEY, "hex");

const encrypt = (data) => {
  const protectedData = data;
  const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);

  let encryptedData = cipher.update(
    JSON.stringify(protectedData),
    "utf-8",
    "hex"
  );
  encryptedData += cipher.final("hex");

  return encryptedData;
};

const decrypt = (data) => {
  const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);

  let decryptedData = decipher.update(data, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return decryptedData.split('"').join("");
};

module.exports = {
  encrypt,
  decrypt,
};
