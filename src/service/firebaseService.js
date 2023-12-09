import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseConfig from "../config/firebase";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class Firebase {
  constructor() {
    this.messaging = getMessaging(app);
    console.log("app.messaging", this.messaging);
  }

  getToken = async (userId = "admin") => {
    try {
      const token = await getToken(this.messaging);
      console.log("Messaging Token", token);
      await this.updateToken(userId, token);
    } catch (er) {
      console.log("get messaging token failed", er);
    }
  };

  updateToken = async (userId, token) => {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, { FCMToken: token }, { merge: true });
      console.log("FCM token updated for user: ", userId);
    } catch (err) {
      console.error("Failed to update FCM token: ", err);
    }
  };

  onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(this.messaging, (payload) => {
        resolve(payload);
      });
    });
}

const firebaseInstance = new Firebase();

export default firebaseInstance;
