import { customAlphabet } from 'nanoid';

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const nanoid = customAlphabet(alphabet, 6); // 6 chars

export default function generateShortCode() {
  return nanoid();
}
