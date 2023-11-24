/**
 * Object
 * A function when they assigned into an object called an Method
 * 
 * Object is an collection of property and a property is an association of key and value {key: value}
 * 
 * Can either access property of an object through dot(.) or square bracket []
 * user.username
 * user['username']
 */


//Object Initializers: also called Literals Object
//objt created with initialers called Plain object
const obj = {
  property1: value1, // property name may be an identifier
  2: value2, // or a number
  "property n": value3, // or a string
};



// create object using constructor function
// instance created with new keyword
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}

function Car(make, model, year, owner) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
}

const car1 = new Car("Eagle", "Talon TSi", 1993, rand);
const car2 = new Car("Nissan", "300ZX", 1992, ken);


// A plain object can be turn into Object by Object.create(objname)
Object.create(obj)



// Enumeraing properties

/**
 * - for_in: tranverses all enumerable string properties of an object as well as it's prototype chain
 * 
 * - Object.keys(): return array with enumerable key properties
 * 
 * - Object.getOwnPropertyNames(): return all string property name regradless it ennumerable or not
 */
function showProps(obj, objName) {
  let result = "";
  for (const i in obj) {
    // Object.hasOwn() is used to exclude properties from the object's
    // prototype chain and only show "own properties"
    if (Object.hasOwn(obj, i)) {
      result += `${objName}.${i} = ${obj[i]}\n`;
    }
  }
  console.log(result);
}


// Delete property
// use delete keyword
// the property deleted with remain empty slot and try to access it will return undefined



// object being inherited from itselft called prototype
Car.prototype.displayCar = function () {
  const result = `A Beautiful ${this.year} ${this.make} ${this.model}`;
  console.log(result);
};

// getter and setter
// can use Object.defineProperties() instead
// accpet 2 parameter: 
// 1st: object worked on
// 2st: object that it's property name is an get or set
const myObj = {
  a: 7,
  get b() {
    return this.a + 1;
  },
  set c(x) {
    this.a = x / 2;
  },
};

console.log(myObj.a); // 7
console.log(myObj.b); // 8, returned from the get b() method
myObj.c = 50; // Calls the set c(x) method
console.log(myObj.a); // 25


















































