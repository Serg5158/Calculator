class Stack {
  constructor() {
    this.data = [];
    this.size = 0;
  }

  push(item) {
    this.data.push(item);
    this.size++;
  }
  pop() {
    if (this.size) {
      this.data.pop();
      this.size++;
    }
  }
  print() {
    console.log(this.data);
  }
}
let s = new Stack();
s.push(5);
s.push(6);
s.print();
s.push(45);
s.push(65);
s.print();
s.pop();
s.pop();
s.print();
