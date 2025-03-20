import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const email = "user@example.com"; // Replace with actual email input
const password = "userpassword"; // Replace with actual password input

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });