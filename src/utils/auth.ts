
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';

export async function signup(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function resetPassword(email: string) {
  return await sendPasswordResetEmail(auth, email);
}

export async function logout() {
  return await signOut(auth);
}
