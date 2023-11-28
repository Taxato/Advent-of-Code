import { sumArr, timeUsed } from "../helper.js";
const startTime = Date.now();

/* 
Begin in state A.
Perform a diagnostic checksum after 12964419 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the right.
    - Continue with state F.

In state B:
  If the current value is 0:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state C.

In state C:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state D.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the right.
    - Continue with state C.

In state D:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state E.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.

In state E:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state F.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state D.

In state F:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state E.
*/

let state = "A";
let cursor = 0;
const tape = {};
const numSteps = 12_964_419;

const left = () => cursor--;
const right = () => cursor++;
const writeOne = () => (tape[cursor] = 1);
const writeZero = () => (tape[cursor] = 0);

for (let i = 0; i < numSteps; i++) {
	if (!(cursor in tape)) tape[cursor] = 0;

	const val = tape[cursor];

	switch (state) {
		case "A":
			if (val === 0) {
				writeOne();
				right();
				state = "B";
			} else if (val === 1) {
				writeZero();
				right();
				state = "F";
			}
			break;
		case "B":
			if (val === 0) {
				writeZero();
				left();
				state = "B";
			} else if (val === 1) {
				writeOne();
				left();
				state = "C";
			}
			break;
		case "C":
			if (val === 0) {
				writeOne();
				left();
				state = "D";
			} else if (val === 1) {
				writeZero();
				right();
				state = "C";
			}
			break;
		case "D":
			if (val === 0) {
				writeOne();
				left();
				state = "E";
			} else if (val === 1) {
				right();
				state = "A";
			}
			break;
		case "E":
			if (val === 0) {
				writeOne();
				left();
				state = "F";
			} else if (val === 1) {
				writeZero();
				left();
				state = "D";
			}
			break;
		case "F":
			if (val === 0) {
				writeOne();
				right();
				state = "A";
			} else if (val === 1) {
				writeZero();
				left();
				state = "E";
			}
			break;
	}
}

console.log(sumArr(Object.values(tape)));

const endTime = Date.now();
timeUsed(startTime, endTime);
