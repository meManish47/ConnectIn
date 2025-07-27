















// function outer() {
//   let count = 0;
//   return function inner() {
//     count++;
//     console.log(count);
//   };
// }

// const counter = outer();
// const counter2 = outer();
// counter(); // 1
// counter(); // 2
// counter2()
// counter2()








// function canUse(){
//     return {walk(){
//         console.log("Can walk")
//     },
//     run(){
//         console.log("can run also")
//         return true
//     }
// }
// }
// function createPerson(name,age){
//     return {
//         name,
//         age,
//         ...canUse()
//     }
// }
// const person = createPerson("Manish",21)
// console.log(person)
// person.walk()
// console.log(person.run())
// console.log(createPerson())