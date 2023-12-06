const myObj = {
  a: 2,
  b: {
    c: 3,
  },
  message: "Hi mom",
};
const printMe = () => {
  console.log(`${myObj.message}: ${myObj.b.c}`);
};
printMe();
