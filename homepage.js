import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc, } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
// import{collection, addDoc , } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
import { updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";



const firebaseConfig = {
    //YOUR COPIED FIREBASE PART SHOULD BE HERE
    apiKey: "AIzaSyBZAI02pI8CUWyP8YEjEjNv1nXlb8VZ6bc",
    authDomain: "test-43a6f.firebaseapp.com",
    projectId: "test-43a6f",
    storageBucket: "test-43a6f.appspot.com",
    messagingSenderId: "922853907642",
    appId: "1:922853907642:web:1c059ffed834fb1d76b683"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

let d_name = document.getElementById('loggedUserFName');
let d_email = document.getElementById('loggedUserEmail');
let d_lastn = document.getElementById('loggedUserLName');
let d_u = document.getElementById('User');
onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    // document.getElementById('loggedUserFName').innerText=userData.firstName.slice(0,1);
                    // document.getElementById('loggedUserEmail').innerText=userData.email;
                    // document.getElementById('loggedUserLName').innerText=userData.lastName;
                    // d_name.innerText = userData.firstName
                    d_u.innerText = userData.firstName.slice(0, 1).toUpperCase();
                }
                else {
                    console.log("no document found matching id")
                }
            })
            .catch((error) => {
                console.log("Error getting document");
            })
    }
    else {
        console.log("User Id not Found in Local storage")
    }
})

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        })
})

// =========================================================== //

let add_blog = document.getElementById('add_blog');
let blog_box = document.getElementById('box_add');

add_blog.addEventListener('click', async () => {

    const { value: text } = await Swal.fire({
        input: "textarea",
        inputLabel: "Message",
        inputPlaceholder: "Type your message here...",
        inputAttributes: {
            "aria-label": "Type your message here"
        },
        showCancelButton: true
    });
    if (text) {
        // Swal.fire(text);
        let blog_text = text;
        console.log(text);
        // const washingtonRef = doc(db, "users", 'DC');

        // // Set the "capital" field of the city 'DC'
        // await updateDoc(washingtonRef, {
        //     btext: text
        // })

        const docRef = await addDoc(collection(db, "data"), {
            
            btext: text,
        });
        console.log("Document written with ID: ", docRef.id);
    }
 });




