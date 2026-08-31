const display = document.getElementById("user-profile");
const form = document.getElementById("user-form");
const input = document.getElementById("name-input");
const button1 = document.getElementById("load-btn");
const button2 = document.getElementById("fetch-btn");
const load = document.getElementById("status-message");
const url = "https://jsonplaceholder.typicode.com/users";


const fetchUser = async() => {
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(response.status);
        }

        const data = await response.json();

        return data;
    }
    catch(error){
        console.error(error.message);
    }
}

const createUser = async(newname) => {
    try{
        const response = await fetch(url,{
            method: "post",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({name : newname})
        });

        if(!response.ok){
            throw new Error(response.status);
        }

        const data = await response.json();

        return data;
    }
    catch(error){
        console.error(error.message);
    }
}

const deleteUser = async(id) =>{
    try{
    const response = await fetch(`${url}/${id}`,{
        method: "DELETE"
        });

        if(!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error.message);
    }

}

const updateUser = async(id,newname) =>{
    try{
        const response = await fetch(`${url}/${id}`,{
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({name : newname})
        });
         if(!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error(error.message);
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

form.addEventListener("submit", async(event)=>{
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