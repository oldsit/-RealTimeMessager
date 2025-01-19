import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import axios from 'axios';

export const registerUser = async (email, password, username) => {
  const auth = getAuth();
  const db = getFirestore();

  try {
    // Step 1: Create user in Firebase Auth
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;

    // Step 2: Store additional user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      username: username,
      email: email,
    });

    // Step 3: Make a POST request to create user folders in the backend
    const backendUrl = 'http://localhost:3000'; // Replace with your backend URL
    await axios.post(`${backendUrl}/create-user-folders`, { userId: user.uid });

    console.log('User registered successfully and folders created', user);
    return user; // Return the user object for further use
  } catch (err) {
    console.error('Error registering user:', err);

    // Map Firebase errors to custom error codes/messages
    if (err.code === 'auth/email-already-in-use') {
      throw new Error('auth/email-already-in-use');
    } else if (err.code === 'auth/weak-password') {
      throw new Error('auth/weak-password');
    } else if (err.code === 'auth/invalid-email') {
      throw new Error('auth/invalid-email');
    }

    // Handle backend errors (if any)
    if (axios.isAxiosError(err)) {
      throw new Error('Backend request failed: ' + (err.response?.data?.message || err.message));
    }

    // For any other errors, re-throw the original error
    throw err;
  }
};
