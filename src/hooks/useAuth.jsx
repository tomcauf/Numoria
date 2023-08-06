import { Auth } from '../Firebase.jsx'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { isEmpty } from 'lodash-es'
import { proxy, useSnapshot } from 'valtio'

function getAuthUser() {
  const jwt = window.localStorage.getItem('jwtToken')

  if (!jwt) return {}
  return JSON.parse(atob(jwt))
}

function isAuth(authUser) {
  return !isEmpty(authUser);
}

const state = proxy({
  authUser: getAuthUser(),
});

const actions = {
  login: async (usernameOrEmail, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(Auth, usernameOrEmail, password);
      const user = userCredential.user;
      state.authUser = {
        uid: user.uid,
        email: user.email,
        username: user.displayName,
        token: user.getIdToken(),
      };
      window.localStorage.setItem('jwtToken', btoa(JSON.stringify(state.authUser)))
      return { code: 200, message: "Login success" };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const emailError = errorCode === "auth/user-not-found" ? "Email not found" : "";
      const passwordError = errorCode === "auth/wrong-password" ? "Wrong password" : "";
      console.log("[🔴] ", errorCode, errorMessage);
      return { code: errorCode, message: errorMessage, emailError, passwordError };
    }
  },
  register: async (username, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      state.authUser = {
        uid: user.uid,
        email: user.email,
        username: user.displayName,
        token: user.getIdToken(),
      }
      window.localStorage.setItem('jwtToken', btoa(JSON.stringify(state.authUser)))
      return { code: 200, message: "Register success" };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const usernameError = errorCode === "auth/username-already-in-use" ? "Username already in use" : "";
      const emailError = errorCode === "auth/email-already-in-use" ? "Email already in use" : "";
      const passwordError = errorCode === "auth/weak-password" ? "Password must be at least 6 characters long" : "";
      const confirmPasswordError = errorCode === "auth/weak-password" ? "Password must be at least 6 characters long" : "";
      return { code: errorCode, message: errorMessage, usernameError, emailError, passwordError, confirmPasswordError };
    }
  },
  logout: () => {
    state.authUser = {}
    window.localStorage.removeItem('jwtToken')
  },
  checkAuth: () => {
    const authUser = getAuthUser()

    if (!authUser || isEmpty(authUser)) {
      actions.logout()
    }
  },
}

export function useAuth() {
  const snap = useSnapshot(state);

  return {
    authUser: snap.authUser,
    isAuth: isAuth(snap.authUser),
    ...actions,
  };
}