# Установка TypeScript

Использовать TypeScript можно с помощью двух инструментов: `tsc` и `ts-node`. Первый компилирует код в JavaScript, а второй выполняет код напрямую.
Для установки TypeScript вам необходимо установить Node.js и npm. Сделать это можно по инструкции [Node.js](/nodejs.md).

* Установка `tsc`: npm install -g typescript
* Установка `ts-node`: npm install -g ts-node

* Компилировать: tsc namefile
* Выполнить: ts-node namefile

## Полезное

* [Хорошая статья по tsconfig](https://habr.com/ru/post/542234/)
* [Strict в tsconfig](https://www.typescriptlang.org/tsconfig#strict)
* [Документация по флагам запуска tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html#compiler-options)
* [Статья "Как устроена система типов в TypeScript"](https://ru.hexlet.io/blog/posts/sistema-tipov-v-typescript?roistat_visit=5573382)

## Заметки

### Необязательный параметр
```
function getGreetingPhrase(name?: string) { // name становится составным: string | undefined;
    return `Hello, ${name ? name.toUpperCase() : 'Guest'}!`;
}
```
Необязательный параметр может быть undefined, но не null. Для добавления null нужно изменить определение так:
```
function getGreetingPhrase(name?: string | null) { // здесь мы расширили определение типа переменной name до string | undefined | null.
    return `Hello, ${name ? name.toUpperCase() : 'Guest'}!`;
    }
```
### Значение по умолчанию
```
function getGreetingPhrase(name = 'Guest') { // Сама переменная автоматически становится необязательной, и тип выводится исходя из переданного значения
    return `Hello, ${name.toUpperCase()}!`;
}
```
### Тип возвращаемого значения

```
function getGreetingPhrase(name: string): string {
    return `Hello, ${name.toUpperCase()}!`;
}
```

### Структурная Типизация
Принцип определяющий совместимость типов основываясь не на иерархии наследования или явной реализации интерфейсов, а на их описании.
Несмотря на то, что Bird и Fish не имеют явно заданного общего предка, TypeScript разрешает присваивать экземпляр класса Fish переменной с типом Bird (и наоборот)
```
class Bird {
    name;
}
class Fish {
    name;
}

var bird: Bird = new Fish();
var fish: Fish = new Bird();
```
```
class Bird {
    name;
    wings;
}
class Fish {
    name;
}

var bird: Bird = new Fish(); // Error
var fish: Fish = new Bird();
```
### TypeScript: Псевдонимы Типов (Type Aliases)
```
type User = {
    firstName: string;
    pointsCount: number;
}
```
Алиас это не создание нового типа данных, а всего лишь способ сокращенно записать определение типа.
Поэтому следующие примеры будут работать без проблем:
```
const user = {
    firstName: 'Mike',
    pointsCount: 1000,
};

// Оба вызова работают
doSomething(user);
doSomething({ firstName: 'Bob', pointsCount: 1800 });
```
### Перечисления (Enums)
```
enum OrderStatus {
    Created,
    Paid
}

const order = {
    items: 3,
    status: OrderStatus.Created,
};
```
### Объекты и функции
Когда функция записывается самостоятельно, то используется формат стрелочной функции:
```
type Countable = (coll: number[]) => number
```
Внутри типа, описывающего объект, формат меняется на такой же, который используется для обычных свойств:
```
type User = {
    firstName: string;
    pointsCount: number;
    count(coll: number[]): number; // пример с коллбеком count(coll: (v: string) => string): number;
}
```
### Система модулей
Механизм namespace позволяет оставаться в рамках одного файла:
```
namespace Hello {
    export function helloWorld() {
        console.log("Hello, world!");
    }
}

const helloWorld = Hello.helloWorld();
```
### Функции как параметры
```
function process(callback: Function) { // Function почти тоже самое что any, лучше так не делать
    const value = callback();
    // ...
}
```
Лучше так... Пример с параметрами:
```
function process(callback: (n: number) => string) {
    const value = callback(10);
    // ...
}
```
или так:
```
type myFunction = (n: number) => string;

function process(callback: myFunction) {
    const value = callback(10);
    // ...
}
```
### Опциональные параметры в колбеках
```
// Необязательный параметр index
// Необязательный параметр index
function filter(coll: number[], callback: (arg: number, index?: number) => boolean) {
    const result: number[] = [];
    coll.forEach((n, index) => {
        // Здесь он передается в колбек
        if (callback(n, index)) {
            result.push(n);
        }
    });
    return result;
}
```
!!! Важно
```
// Выполнится без ошибок
filter([1, 2], (n) => n > 1);
// Object is possibly 'undefined'
filter([1, 2], (n, index) => index > n);
```
В данном случае ошибка обозначает то, что из-за "необязательности", внутри колбека в теории может оказаться undefined, чего по смыслу происходить не может, индекс всегда определен.