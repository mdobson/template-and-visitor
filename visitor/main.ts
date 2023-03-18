enum TokenType {
  Number = "Number",
  Plus = "Plus",
  Minus = "Minus",
}

interface DobsyNode {
  tokenType: TokenType;
  accept(visitor: Visitor): number;
}

class PlusNode implements DobsyNode {
  public tokenType: TokenType = TokenType.Plus;
  public left: DobsyNode;
  public right: DobsyNode;

  constructor(left: DobsyNode, right: DobsyNode) {
    this.left = left;
    this.right = right;
  }

  accept(visitor: Visitor): number {
    return visitor.visitPlus(this);
  }
}

class NumberNode implements DobsyNode {
  public tokenType: TokenType = TokenType.Number;
  public value: number;

  constructor(value: number) {
    this.value = value;
  }

  accept(visitor: Visitor): number {
    return visitor.visitNumber(this);
  }
}

interface Visitor {
  visitNumber(node: NumberNode): number;
  visitPlus(node: PlusNode): number;
}

class DobsyVisitor implements Visitor {
  visitNumber(node: NumberNode): number {
    console.log("NumberNode", node.value);
    return node.value;
  }

  visitPlus(node: PlusNode): number {
    console.log("PlusNode");
    return node.left.accept(this) + node.right.accept(this);
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
