// 일반함수
// var 키워드로 선언한 전역 변수 value는 전역객체의 프로퍼티다.
var value = 1;
// const 키워드로 선언한 지역 변수 value는 전역 객체의 프로퍼티가 아니다.
// const value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this);
    console.log("foo's this.value: ", this.value);

    // 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면, 중첩함수 내부의 this에는 전역객체가 바인딩 된다.
    function bar() {
      console.log("foo's this: ", this);
      console.log("foo's this.value: ", this.value);
    }
    bar();
  },
};

obj.foo();

// 콜백 함수가 일반 함수로 호출된다면 콜백 함수 내부의 this에도 전역 객체가 바인딩된다. 어떠한 함수라도 일반 함수로 호출되면 this에 전역객체가 바인딩 된다.

const obj1 = {
  value: 100,
  foo() {
    console.log("foo's this: ", this);
    console.log("foo's this.value: ", this.value);

    // 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면, 중첩함수 내부의 this에는 전역객체가 바인딩 된다.
    setTimeout(function () {
      console.log("callback's this: ", this);
      console.log("callback's this.value: ", this.value);
    }, 100);
  },
};
obj1.foo();

const obj2 = {
  value: 100,
  foo() {
    // this 바인딩(obj2)을 변수 that에 할당한다.
    const that = this;

    // 콜백 함수 내부에서 this을 대신 that을 참조한다.
    setTimeout(function () {
      console.log("1callback's that.value: ", that.value);
    }, 100);
  },
};

obj2.foo();

const obj3 = {
  value: 100,
  foo() {
    // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
    setTimeout(() => {
      console.log("2callback's that.value: ", this.value);
    }, 100);
  },
};

obj3.foo();

console.log("메서드 함수 라인 ======================================");

const person = {
  name: "Lee",
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩 된다.
    return this.name;
  },
};
console.log("person = " + person.getName());

const anotherPerson = {
  name: "Kim",
};
// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

// getName 메서드를 호출한 객체는 anotherPerson이다.
console.log("anotherPerson == " + anotherPerson.getName());
console.log("person = " + person.getName());
// getName 메서드를 일반 함수로 호출
//console.log(getName);

function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

const me = new Person("Lee");

// getName 메서드를 호출한 객체는 me다.
console.log("me == " + me.getName());

Person.prototype.name = "Kim";

// getName 메서드를 호출한 객체는 Person.prototype이다.
console.log("Person.prototype == " + Person.prototype.getName());

console.log("생성자 함수 라인 ======================================");
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);

// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log("circle1 == " + circle1.getDiameter());
console.log("circle2 == " + circle2.getDiameter());
/*
생성자 함수는 이름 그대로 객체(인스턴스)를 생성하는 함수이다.
일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 호출하면
해당 함수는 생성자 함수로 동작한다.
만약 new 연산자와 함께 생성자 함수를 호출하지 않으면 생성자 함수가 아니라
일반 함수로 동작한다.
*/

// new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않는다.즉, 일반적인 함수의 호출이다.
const circle3 = Circle(5);

// 일반 함수로 호출된 Circle에는 반환문이 없으므로 암묵적으로 undefined를 반환한다.
console.log(circle3);

// 일반한수로 호출된 circle 내부의 this는 전역 객체를 가리킨다.
console.log(radius);
console.log(this);
console.log(this.radius);
//Function.prototype.apply/call/bind 메서드에 의한 간접 호출

function getThisBinding() {
  console.log(this);
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log("getThisBinding=== " + getThisBinding());
console.log("getThisBinding.apply=== " + getThisBinding.apply(thisArg));
console.log("getThisBinding.call=== " + getThisBinding.call(thisArg));
console.log("=================================");
function getThisBinding() {
  console.log(arguments);
  console.log(this);
  return this;
}

// this로 사용할 객체
const thisArg1 = { a: 1 };

console.log("getThisBinding.apply=== " + getThisBinding.apply(thisArg1, [1, 2, 3]));
console.log("getThisBinding.call=== " + getThisBinding.call(thisArg1, 1, 2, 3));

// apply와 call 메서드를 이용한 Array.prototype.slice 사용

function convertArgsToArray() {
  console.log(arguments);

  // arguments 객체를 배열로 변환
  // Array.prototype.slice를 인수 없이 호출하면 배열의 복사본을 생성한다.
  const arr = Array.prototype.slice.call(arguments);
  const arr1 = Array.prototype.slice.apply(arguments);

  console.log("arr(call) == " + arr);
  console.log("arr1(apply) == " + arr1);

  return arr, arr1;
}
convertArgsToArray(1, 2, 3);

// bind 메서드
function getThisBinding() {
  // console.log(arguments);
  console.log(this);
  return this;
}

// this로 사용할 객체
const thisArg2 = { a: 1 };

// bind 메서드는 첫 번째 인수로 전달한 thisArgs로 this 바인딩이 교체된
// getThisBinding 함수를 새롭게 생성해 반환한다.
console.log("getThisBinding.bind == " + getThisBinding.bind(thisArg2));
console.log("getThisBinding.bind == " + getThisBinding.bind(thisArg2)());

const person1 = {
  name: "Lee",
  foo(callback) {
    // 1)
    setTimeout(callback, 1000);
  },
};

person1.foo(function () {
  console.log(`Hi! my name is ${this.name}.`); // 2)
  /* 일반 함수로 호출된 콜백 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
  브라우겨 환경에서 window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이며 기본값은 ''이다.
  node.js 환경에서는 this.name은 undefined다. */
});

const person2 = {
  name: "Lee",
  foo(callback) {
    // 1)
    setTimeout(callback.bind(this), 1000);
  },
};

person2.foo(function () {
  console.log(`Hi! my name is ${this.name}.`);
});
