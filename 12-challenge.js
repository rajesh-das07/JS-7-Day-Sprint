const display = document.getElementById("user-profile");
const form = document.getElementById("user-form");
const input = document.getElementById("name-input");
const button1 = document.getElementById("load-btn");
const button2 = document.getElementById("fetch-btn");

button1.addEventListener("click", async() => {
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if(!response.ok){
            throw new Error(response.status);
        }

        const data = await response.json();

        data.forEach(element => {
            display.innerHTML += `<h2> ${element.name} </h2>`;
        });
    }
    catch(error){
        console.error(error.message);
    }
})

form.addEventListener("submit", async(event) => {
    event.preventDefault();
    const newname = input.value;
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users",{
            method: "post",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify( {name : newname} )
        });

        if(!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();

        display.innerHTML += `<h2> ${data.name} </h2>`;
        input.value = ""
    }
    catch(error){
        console.error(error.message);
    }
})