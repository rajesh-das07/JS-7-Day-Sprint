const tasks1 = [
    { id: 1, title: "Learn JS", completed: true },
    { id: 2, title: "Fix Resume", completed: false },
    { id: 3, title: "Build To-Do App", completed: false }
];

 const list = document.getElementById("to-do-list");

tasks1.forEach((task) => {list.innerHTML += "<li>" + task.title + "</li>"});

//tasks1.forEach((task) => {list.innerHTML += `<li>${task.title}</li>`;});  its a alternative

console.log(tasks1)
