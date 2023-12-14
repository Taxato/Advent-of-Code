import { LinkedList, time } from "../helper.js";
const startTime = process.hrtime();

const list = new LinkedList();

list.append(10);
list.append(15);
list.append(20);
list.prepend(30);
list.prepend(35);
list.append(40);
console.log(list.toArray());
console.log(list.traverseToIndex(1));

time(startTime);
