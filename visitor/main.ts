enum TokenType {
  Number = "Number",
  Plus = "Plus",
  Minus = "Minus",
}

interface DobsyNode {
  tokenType: TokenType;
  accept<T>(visitor: Visitor<T>): T;
}

class PlusNode implements DobsyNode {
  public tokenType: TokenType = TokenType.Plus;
  public left: DobsyNode;
  public right: DobsyNode;

  constructor(left: DobsyNode, right: DobsyNode) {
    this.left = left;
    this.right = right;
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitPlus(this);
  }
}

class NumberNode implements DobsyNode {
  public tokenType: TokenType = TokenType.Number;
  public value: number;

  constructor(value: number) {
    this.value = value;
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitNumber(this);
  }
}

interface Visitor<T> {
  visitNumber(node: NumberNode): T;
  visitPlus(node: PlusNode): T;
}

class DobsyVisitor implements Visitor<number> {
  visitNumber(node: NumberNode): number {
    return node.value;
  }

  visitPlus(node: PlusNode): number {
    return node.left.accept(this) + node.right.accept(this);
  }
}

class PrintVisitor implements Visitor<string> {
  visitNumber(node: NumberNode): string {
    return node.value.toString();
  }

  visitPlus(node: PlusNode): string {
    return "(" + node.left.accept(this) + "+" + node.right.accept(this) + ")";
  }
}

const program = new PlusNode(
  new PlusNode(new NumberNode(1), new NumberNode(1)),
  new NumberNode(2)
);
console.log(`final ${program.accept(new DobsyVisitor())}`);

const source = "1 + 1 + 2 + 4 + 3";

const tokens = source.split(" ");
let prevToken: DobsyNode | null = null;
for (let i = 0; i < tokens.length; i++) {
  const element = tokens[i];
  let token: DobsyNode | null = null;
  if (element === "+") {
    token = new PlusNode(prevToken!, new NumberNode(parseInt(tokens[i + 1])));
    i++;
  } else if (Number.isInteger(parseInt(element)) === true) {
    token = new NumberNode(parseInt(element));
  } else {
    throw new Error(`Unexpected token ${element}`);
  }
  prevToken = token;
}

console.log(`final value of program ${prevToken!.accept(new DobsyVisitor())}`);
console.log(`final value of program ${prevToken!.accept(new PrintVisitor())}`);
