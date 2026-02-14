import CryptoJS from "crypto-js";

export function hashPassword(pwd) {
  return CryptoJS.SHA256(pwd).toString();
}
