const button = document.getElementById("fetch-btn");
const event1 = document.getElementById("user-profile");

    button.addEventListener("click", async () => {
    try{
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if(!response.ok){
        throw new Error(response.status);
    }

    const data = await response.json();

    const randomIndex = Math.floor(Math.random() * data.length);
    const winner = data[randomIndex];
    
        event1.innerHTML = `<h2> 🏆 Lucky Winner: ${winner.name} </h2> <hr>`;
}
    catch(error){
        event1.innerHTML = `<h1> ${error.message} </h1>`;
        console.error("error", error);
    }
})

