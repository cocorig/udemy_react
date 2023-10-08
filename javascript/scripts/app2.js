const userNameData = ['Hayeon' ,'Lee'];

// const firstName =  userNameData[0]
// const lastName =  userNameData[1]


const  [firstName , lastName] =  ['Hayeon' ,'Lee'];
//console.log(firstName , lastName);



// const user = {
//   name : 'Hayeon',
//   age : 23
// };

// const name = user.name;
// const age =  user.age;
// console.log(name , age);


// 객체 분해

// 객체에서 프로퍼티 이름을 기준으로 가져오므로 동일한 프로퍼티 이름을 사용해야함
const {name : userName , age} = {
  name : 'Hayeon',
  age : 23
};

console.log(userName , age);
