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

const renderUser = (name) => {
    display.innerHTML += `${name} <br> <br>`;
    
}
const loading = () => {
    load.innerHTML = `loading`;
}

button1.addEventListener("click", async() => {
    button1.disabled = true;
    loading()
    const users = await fetchUser();
    if(users){
        users.forEach(user => renderUser(user.name));
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
        renderUser(user.name);
        input.value = "";
        load.innerText = "";
    }
    else{
        load.innerHTML = `<h2 style = "color: red;"> Failed to load users. Please try again.</h2>`;
    }
    button2.disabled = false;
})