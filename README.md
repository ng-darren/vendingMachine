# Vending Machine
Distributed vending machines and a big boss example written in React. Uses Firestore for database.

Just create a firebase.js file in the src folder with your own firebase credentials. An example of firebase.js is attached below.


  import firebase from "firebase";

  const config = {

	  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  
	  authDomain: "xxxxxxxxxxxxxxxxx.firebaseapp.com",
  
	  databaseURL: "https://xxxxxxxxxxxx.firebaseio.com",
  
	  projectId: "xxxxxxxxxxxxxxxxx",
  
	  storageBucket: "xxxxxxxxxxxxxxx.appspot.com",
  
	  messagingSenderId: "xxxxxxxxxxxxxxxxx"
  };

  firebase.initializeApp(config);

  export default firebase;
  
  Have Fun!
