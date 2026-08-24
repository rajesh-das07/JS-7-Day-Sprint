const user = document.getElementById("user-form");
const input = document.getElementById("name-input");
const profileDiv = document.getElementById("user-profile");

user.addEventListener("submit" , async(event) => {
    event.preventDefault();

    const newName = input.value;
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users",{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({ name : newName})
    });

    if(!response.ok){
        throw new Error(response.status);
    }
    const data = await response.json();

    profileDiv.innerHTML = `<h2> ✅ User Created: ${data.name}</h2> <p>Assigned ID: ${data.id}</p>`;
    input.value = "",

    console.log(data);
    }
    catch(error){
        console.error(error.message);
    }

    


})