import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBjRR9ojXTYX9mKqPnPr66BCq3DzNCpRbY",
  authDomain: "sandbox-d24c0.firebaseapp.com",
  projectId: "sandbox-d24c0",
  storageBucket: "sandbox-d24c0.firebasestorage.app",
  messagingSenderId: "441672880776",
  appId: "1:441672880776:web:2a2199d073c368bb3dc53d",
  measurementId: "G-GBG27EM53V"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const display = document.getElementById("user-profile");
const form = document.getElementById("user-form");
const input = document.getElementById("name-input");
const button1 = document.getElementById("load-btn");
const button2 = document.getElementById("fetch-btn");
const load = document.getElementById("status-message");



const fetchUser = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = [];
        
        querySnapshot.forEach((doc) => {
            usersList.push({ id: doc.id, ...doc.data() }); 
        });
        
        return usersList;
    } catch (error) {
        console.error("Firestore Error:", error.message);
    }
}

const createUser = async (newname) => {
    try {
        // addDoc automatically creates a new document in the "users" folder
        // and generates a random unique ID for it.
        const docRef = await addDoc(collection(db, "users"), {
            name: newname
        });
        
        // We return the new ID and the name back to your event listener
        // so it can render the new person on the screen immediately.
        return { id: docRef.id, name: newname };
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

const deleteUser = async (id) => {
    try {
        // doc(db, "users", id) creates a direct pointer to the exact person you want to trash.
        // deleteDoc actually executes the deletion on Google's servers.
        await deleteDoc(doc(db, "users", id));
        console.log(`User ${id} successfully deleted from Firestore.`);

    } 
    catch (error) {
        console.error("Error deleting document: ", error);
    }
}

const updateUser = async (id, updatedName) => {
    try {
        const userRef = doc(db, "users", id);
        
        await updateDoc(userRef, {
            name: updatedName
        });
        
        console.log(`User ${id} successfully updated.`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

const renderUser = (user) => {
    const userDiv = document.createElement("div");
    userDiv.className = "user-card";

    const nameText = document.createElement("span");
    nameText.innerText = user.name + " ";

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    editBtn.addEventListener("click", async() =>{
        const userInput = prompt("Enter new Name",user.name);
        if(userInput && userInput.trim() !== "" ){
            await updateUser(user.id,userInput);
            nameText.innerText = userInput + " ";
        }else{
            alert("no input or cannot upadted");
        }

    })

    deleteBtn.addEventListener("click", async() => {
        await deleteUser(user.id);
        userDiv.remove();
    })

    userDiv.appendChild(nameText);
    userDiv.appendChild(editBtn);
    userDiv.appendChild(deleteBtn);
    display.appendChild(userDiv);

    
}
const loading = () => {
    load.innerHTML = `loading`;
}

button1.addEventListener("click", async() => {
    button1.disabled = true;
    loading()
    const users = await fetchUser();
    if(users){
        users.forEach(user => renderUser(user));
        load.innerText = "";
    }
    else{
        load.innerHTML = `<h2 style = "color: red;"> Failed to load users. Please try again.</h2>`;
    }
    button1.disabled = false;
})

form.addEventListener("submit", async(event )=>{
    event.preventDefault();

    const newname = input.value.trim();
    if(newname === ""){
        alert("Please enter a name");
        return;
    }
    button2.disabled = true;
    loading();
    const user = await createUser(newname);
    if(user){
        renderUser(user);
        input.value = "";
        load.innerText = "";
    }
    else{
        load.innerHTML = `<h2 style = "color: red;"> Failed to load users. Please try again.</h2>`;
    }
    button2.disabled = false;
})