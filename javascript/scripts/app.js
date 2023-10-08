// import { apikey } from './util.js';

// import apikey from './util.js';


// import { abc , def}  from './util.js'
// console.log(apikey);

// export할 대상을 하나의 객체로 묶어 가져올 수도 있다.
// import * as util from './util.js';
// console.log(util);
// 리액트에서는 파일에서 export할 대상이 하나의 컴포넌트밖에 없으므로 export default 로 작성함.

function createGreeting(userName , message = 'Hello!'){ // default 값을 줄 수 있다.
  // console.log(userName , message);

  return `Hi, I am ${userName} ${message}`;
}
const greeting1  = createGreeting('Max');
console.log(greeting1);
const greeting2 =  createGreeting('Max' , 'Bye!'); // default 오버라이드
console.log(greeting2);

// 자바스크립트는 중괄호가 함수 본문을 정의하는 것이 아니라 객체를 생성하기 위한 것임을 이해합니다. 따라서 객체가 반환됩니다.
//number => ({ age: number }); // 추가 괄호를 써서 객체를 감싸줍니다.


const user = {
  name :  'Max',
  age : 24,
  greet(){
    console.log('hello');
    console.log(this.age);
  }
};

console.log(user);
console.log(user.greet());

class User {
  constructor(name , age){
    this.name =  name;
    this.age = age;
  }
  greet(){
    console.log('Hi!!');
  }
}

const user1 = new User('hayeon' , 25);
console.log(user1.name , user1.age);
console.log(user1.greet());

const hobbies = ['one', 'two' , 'three']
// findIndex  

const index = hobbies.findIndex((item) =>  item === 'two'); // trwo인 값의 인덱스를 찾아)

const editeHobbies =  hobbies.map((item)=> ({name :  item}));
console.log(editeHobbies)


function transformToObjects(numberArray) {
  return numberArray.map((item)=>({'val' : item}));
}

console.log(transformToObjects([1,2,3]));