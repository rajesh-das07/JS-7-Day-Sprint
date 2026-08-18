// arrays
//Write a script in your editor that does this:

// Create an array called users.

// Inside that array, put two Objects. Each object should have three properties: name (string), age (number), and isAdmin (boolean). Make one user an admin and the other not.

// Write a console.log that prints ONLY the name of the second user in the array.

// const user1 = {
//     name: Raj,
//     age: 25,
//     isadmin: 1
// }

// const user2 = {
//      name: Mohit,
//     age: 26,
//     isadmin: 0
// }
// const users = [user1, user2 ];

// console.log(users[1,name]);

//corrected code


const users = [
    {
        name: "Raj",
        age: 25,
        isAdmin: true
    },
    {
        name: "Mohit",
        age: 26,
        isAdmin: false
    }
];

console.log(users[1].name); // Prints: Mohit


//filters
const tasks = [
    { id: 1, title: "Learn JS", completed: true },
    { id: 2, title: "Fix Resume", completed: false },
    { id: 3, title: "Build To-Do App", completed: false }
];

const pendingTasks = tasks.filter((task) => task.completed === false);

console.log(pendingTasks);

//map

const tasks1 = [
    { id: 1, title: "Learn JS", completed: true },
    { id: 2, title: "Fix Resume", completed: false },
    { id: 3, title: "Build To-Do App", completed: false }
];

const taskTitles = tasks1.map((task1) => task1.title);

console.log(taskTitles);