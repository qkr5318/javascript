/**
 * 클로저는 상태를 안전하게 변경하고 유지하기 위해 사용한다. 다시말해, 상태가 의도치 않게 변경되지 않도록 상태를 안전하게 은닉(information hiding)하고 특정 함수에게만 상태 변경을 허용하기 이해 사용한다.
 *
 * 함수가 호출될 때마다 호출된 횟수를 누적하여 출력하여 출력하는 카운터를 만들어 본다.
 *
 * 이 예제의 호출된 횟수(num 변수)가 바로 안전하게 변경하고 유지해야 할 상태다.
 */

// // 카운트 상태 변수
// let num = 0;

// // 카운트 상태 변경 함수
// const increase = function () {
//   // 카운트 상태를 1만큼 증가시킨다.
//   return ++num;
// };

// console.log(increase()); // 1
// console.log(increase()); // 2
// console.log(increase()); // 3

/*위 코드는 잘 동작하지만 오류를 발생시킬 가능성을 내포하고 있는 좋지 않은 코드다. 그 이유는 위 예제가 바르게 동작하려면 다음의 전제 조건이 지켜져야 하기 때문이다.

1. 카운트 상태(num 변수의 값)는 increase 함수가 호출되기 전까지 변경되지 않고 유지되어야 한다.
2. 이를 위해 카운트 상태(num 변수의 값)는 increase 함수만이 변경할 수 있어야 한다.

하지만 카운트 상태는 전역 변수를 통해 관리되고 있기 때문에 언제든지 누구나 접근할 수 있고 변경할 수 있다(암묵적 결합).
이는 의도치 않게 상태가 변경될 수 있다는 것을 의미한다. 만약 누군가에 의해 의도치 않게 카운트 상태, 즉 전역 변수 num의 값이 변경되면 이는 오류로 이어진다.

따라서 카운트 상태를 안전하게 변경하고 유지하기 위해서는 increase 함수만이 num 변수를 참조하고 변경 할 수 있게 하는 것이 바람직하다.
이를 위해 전역 변수 num을 increase 함수의 지역 변수로 바꾸어 의도치 않은 상태를 변경을 방지해보자*/
// 카운트 상태 변수

// // 카운트 상태 변경 함수
// const increase = function () {
//   // 카운트 상태 변수
//   let num = 0;
//   // 카운트 상태를 1만큼 증가시킨다.
//   return ++num;
// };

// console.log(increase()); // 1
// console.log(increase()); // 1
// console.log(increase()); // 1

/*
카운트 상태를 안전하게 변경하고 유지하기 위한 전역 변수 num을 increase 함수의 지역 변수로 변경하여 의도치 않은 상태 변경은 방지했다.
이제 num 변수의 상태는 increase 함수만이 변경할 수있다.

하지만 increase 함수가 호출될 때마다 지역 변수 num은 다시 선언되고 0으로 초기화되기 때문에 출력 결과는 언제나 1이다. 다시 말해, 상태가 변경되기 이전 상태를 유지하지 못한다. 이전 상태를 유지할 수 있도록 클로저를 사용해 보자
*/
// // 카운트 상태 변경 함수
// const increase = (function () {
//   // 카운트 상태 변수
//   let num = 0;
//   // 클로저
//   return function () {
//     // 카운트 상태를 1만큼 증가시킨다.
//     return ++num;
//   };
// })();

// console.log(increase()); // 1
// console.log(increase()); // 2
// console.log(increase()); // 3
/*
위 코드가 실행되면 즉시 실행 함수가 호출되고 즉시 실행 함수가 반환한 함수가 increase 변수에 할당된다.
increase 변수에 할당된 함수는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하는 클로저다.

즉시 실행 함수는 호출된 이후 소멸되지만 즉시 실행 함수가 반환한 클로저는 increase 변수에 할당되어 호출된다. 
이때 즉시 실행 함수가 반환한 클로저는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 렉시컬 환경을 기억하고 있따. 따라서 즉시 실행 함수가 반환한 클로저는 카운트 상태를 유지하기 위한 자유 변수 num을 언제 어디서 호출하든지 참조하고 변경할 수 있다.

즉시 실행 함수는 한 번만 실행되므로 increase가 호출될 때마다 num 변수가 재차 초기화될 일은 없을 것이다.
또한 num 변수는 외부에서 직접 접근할 수 없는 은닉된 private 변수이므로 전역 변수를 사용했을 때와 같이 의도되지 않은 변경을 걱정할 필요도 없기 때문에 더 안정적인 프로그래밍이 가능하다.

이처럼 클로저는 상태가 의도치 않게 변경되지 않도록 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용한다.

앞의 예제는 카운트 상태를 증가시킬 수만 있다. 카운트 상태를 감소시킬 수도 있도록 좀더 발전시켜보자
*/

// const conuter = (function () {
//   // 카운트 상태 변수
//   let num = 0;

// // 클로저인 메서드를 갖는 객체를 반환한다.
// // 객체 리터럴은 스코프를 만들지 않는다.
// // 따라서 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경이다.
//   return {
//     // num: 0, // 프로퍼티는 public 하므로 은닉되지 않는다.
//     increase() {
//       return ++num;
//     },
//     decrease() {
//       return num > 0 ? --num : 0;
//     },
//   };
// })();

// console.log(conuter.increase()); // 1
// console.log(conuter.increase()); // 2

// console.log(conuter.decrease()); // 1
// console.log(conuter.decrease()); // 0

/*
위 예제에서 즉시 실행 함수가 반환하는 객체 리터럴은 즉시 실행 함수의 실행 단계에서 평가되어 객체가 된다.
이때 객체의 메서드도 함수 객체로 생성된다. 객체 리터럴의 중괄호는 코드 블록이 아니므로 별도의 스코프를 생성하지 않는다.

위 예제의 increase, decrease 메서드의 상위 스코프는 increase, decrease 메서드가 평가되는 시점에 실행 중인 실행 컨텍스트인 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경이다.
따라서 increase, decrease 메서드가 언제 어디서 호출되든 상관없이 increase, decrease 함수는 즉시 실행 함수의 스코프의 식별자를 참조할 수 있다.
*/
// 위 예제를 생성자 함수로 표현하면 다음과 같다.
// const Counter = (function () {
//   // 1. 카운트 상태 변수
//   let num = 0;

//   function Counter() {
//     // this.num = 0; // 2 프로퍼티는 public하므로 은닉되지 않는다.
//   }

//   Counter.prototype.increase = function () {
//     return ++num;
//   };

//   Counter.prototype.decrease = function () {
//     return num > 0 ? --num : 0;
//   };

//   return Counter;
// })();

// const counter = new Counter();

// console.log(counter.increase()); // 1
// console.log(counter.increase()); // 2

// console.log(counter.decrease()); // 1
// console.log(counter.decrease()); // 0

/*
위 예제의 num 1)은 생성자 함수 Counter가 생성할 인스턴스의 프로퍼티가 아니라 즉시 실행 함수 내에서
선언된 변수다. 만약 num이 생성자 함수 Counter가 생성할 인스턴스의 프로퍼티라면2) 인스턴스를 통해 외부에서 접근이 자유로운 public 프로퍼티가 된다.
하지만 즉시 실행 함수 내에서 선언된 num 변수는 인스턴스를 통해 접근할 수 없으며, 즉시 실행 함수 외부에서도 접근할 수 없는 은닉된 변수다.

생성자 함수 counter는 프로토타입을 통해 increase, decrease 메서드를 상속받는 인스턴스를 생성한다.
increase, decrease 메서드는 모두 자신의 함수 정의가 평가되어 함수 객체가 될 때 실행 중인 실행 컨텍스트인 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경을 기억하는 클로저다. 따라서 프로토타입을 통해 상속되는 
프로토타입 메서드일지라도 즉시 실행 함수의 자유 변수 num을 참조할 수 있다.
다시 말해, num 변수의 값은 increase, decrease 메서드만이 변경할 수 있다.

변수 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적 원이이 될 수 있다. 외부 상태 변경이나 가변(mulable) 데이터를 피하고 불변성(immutability)을 지향하는 함수형 프로그래밍에서 부수 효과를 최대한 억제하여 
오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다.
*/
// 다음은 함수형 프로그래밍에서 클로저를 활용하는 간단한 예제다.

// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
// function makeCounter(aux) {
//   // 카운트 상태를 유지하기 위한 자유 변수
//   let counter = 0;

//   // 클로저를 반환
//   return function () {
//     // 인수로 전달받은 보조 함수에 상태 변경을 위임한다.
//     couter = aux(counter);
//     return couter;
//   };
// }

// function increase(n) {
//   return ++n;
// }

// // 보조 함수
// function decrease(n) {
//   return --n;
// }
// // 함수로 함수를 생성한다.
// // makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다.
// const increaser = makeCounter(increase); // 1)
// console.log(increaser()); // 1
// console.log(increaser()); // 1

// // increaser 함수와는 별개의 독립된 렉시컬 환경을 갖지 때문에 카운터 상태가 연동하지 않는다.
// const decreaser = makeCounter(decrease); // 2)
// console.log(decreaser()); // -1
// console.log(decreaser()); // -1

/*
makeCounter 함수는 보조 함수를 인자로 전달받고 함수를 반환하는 고차 함수다. makeCoutner 함수가 반환하는 함수는 자신이 생성됐을 때의 렉시컬 환경인 makeCounter 함수의 스코프에 속한 counter 변수를 기억 하는 클로저다.

makeCounter 함수는 인자로 전달받은 보조 함수를 합성하여 자신이 반환하는 함수의 동작을 변경할 수 있다.
이때 주의해야 할 것은 makeCounter 함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬
환경을 갖는다는 것이다. 이는 함수를 호출하면 그때마다 새로운 makeCounter 함수 실행 컨텍스트의 렉시컬 환경이 생성되기 때문이다.

1) 에서 makeCounter 함수를 호출하면 makeCounter 함수의 실행 컨텍스트가 생성된다. 그리고 makeCounter
함수는 함수 객체를 생성하여 반환한 후 소멸된다. makeCounter 함수가 반환한 함수는 makeCounter에 할당된다. 이 때 makeCounter 함수의 실행 컨텍스트는 소멸되지만 makeCounter 함수 실행 컨텍스트의 렉시컬 환경은 makeCounter 함수가 반환한 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있기 때문에 소멸되지 않는다.

그림

2)에서 makeCounter 함수를 호출하면 새로운 makeCounter 함수의 실행 컨텍스트가 생성된다.
그리고 makeCounter 함수는 함수 객체를 생성하여 반환한 후 소멸된다. makeCounter 함수가 반환한 함수는
makeCounter 함수의 렉시컬 환경을 상위 스코프로서 기억하는 클로저이며,
전역 변수인 decrease에 할당된다.
이때 makeCounter 함수의 실행 컨텍스트는 소멸되지만 makeCounter 함수 실행 컨텍스트의 렉시컬 환경
은 makeCounter 함수가 반환한 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있기 때문에 소멸되지 않는다.

그림

위 예제에서 전역 변수 increase와 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에
카운트를 유지하기 위한 자유 변수 counter를 공유하지 않아 카운터의 증감이 연동되지 않는다.
따라서 독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다.
이를 위해서는 makeCounter 함수를 두 번 호출하지 말아야 한다.
*/

// 함수를 반환하는 고차 함수
// // 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
// const counter = (function () {
//   // 카운트 상태를 유지하기 위한 자유 변수
//   let counter = 0;

//   // 함수를 인수로 전달받는 클로저를 반환
//   return function (aux) {
//     // 인수로 전달받은 보조 함수에 상태 변경을 위임한다.
//     counter = aux(counter);
//     return counter;
//   };
// })();

// // 보조 함수
// function increase(n) {
//   return ++n;
// }

// // 보조 함수
// function decrease(n) {
//   return --n;
// }
// // 보조 함수를 전달하여 호출
// console.log(counter(increase)); // 1
// console.log(counter(increase)); // 2

// // 자유 변수를 공유한다.
// console.log(counter(decrease)); // 1
// console.log(counter(decrease)); // 0
