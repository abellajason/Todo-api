// var person = {
//     name : "jason",
//     age : 21
// };


// function updatePerson (obj) {
//     obj.age = 24;
// }

// updatePerson(person)
// console.log(person);

var grades = [15, 37];


//updated

function addGrade(grade) {
    grades.push(grade); 
}


addGrade(21);
console.log(grades);

//not updated 

function addGrade2(grade) {
    grade = [1,2,3];
}


addGrade2(grades);
console.log(grades);