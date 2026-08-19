const prof = document.getElementById("user-profile");

const getUser  = async () => {
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

        const data = await response.json();

        prof.innerHTML =`<h2> ${data.name} </h2> <p> ${data.email} </p>`;
    }
    catch(error){
        console.error("not found", error);
    }
}

getUser();