const panel = document.getElementById("delete-panel");
const input = document.getElementById("delete-id");
const button = document.getElementById("delete-btn");
const statusDiv = document.getElementById("status-message");

button.addEventListener("click", async() =>{
    const userId = input.value;
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;

    try{

        const response = await fetch(url,{
            method: "DELETE"
        });

        if(!response.ok){
            throw new Error(response.status);
        }

        const data = await response.json();

        statusDiv.innerHTML = `<h2 style="color: green;">✅ User ${userId} successfully deleted.</h2>`;
        input.value = "";
    }
    catch(error){
        console.error("error", error.message);
    }
})