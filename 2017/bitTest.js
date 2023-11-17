let a = 65;
let fac = 16807;
let b16 = Number(0b1_1111_1111_1111_1111);

a *= fac;
let b = a & b16;

console.log(Number("0b" + a.toString(2).slice(-16)), b);
a *= fac;
b *= fac;
b = b & b16;

console.log(Number("0b" + a.toString(2).slice(-16)), b);
a *= fac;
b *= fac;
b = b & b16;

console.log(Number("0b" + a.toString(2).slice(-16)), b);
a *= fac;
b *= fac;
b = b & b16;

console.log(Number("0b" + a.toString(2).slice(-16)), b);
a *= fac;
b *= fac;
b = b & b16;

console.log(Number("0b" + a.toString(2).slice(-16)), b);
