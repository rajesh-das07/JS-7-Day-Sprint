const bad = document.getElementById("user-profile");

const getBadUser = async () => {
    try{
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

        if(!response.ok) {
            throw new Error("Status: " + response.status);
        }


    const data = await response.json();
    bad.innerHTML =`<h2> ${data.name} </h2> <p> ${data.email} </p>`;
}
    catch(error){
        bad.innerHTML = `<h2 style="color: red;"> ${error.message} </h2>`;
        console.error("notfound",error.message);
    }
}
getBadUser();