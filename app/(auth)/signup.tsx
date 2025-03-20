import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
const email = "user@example.com"; // Replace with actual email input
const password = "userPassword"; // Replace with actual password input

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
