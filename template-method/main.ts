class ServiceIntelligence {
  public performTask(): void {
    this.startWork();
    this.prompt();
    this.getData();
    this.display();
    this.endWork();
  }

  public startWork(): void {
    console.log("ServiceIntelligence doWork");
  }

  public prompt(): void {
    console.log("ServiceIntelligence prompt");
  }

  public getData(): void {}

  public display(): void {}

  public endWork(): void {
    console.log("ServiceIntelligence endWork");
  }
}

class InforceIntelligence extends ServiceIntelligence {
  public getData(): void {
    console.log("InforceIntelligence getData");
  }

  public display(): void {
    console.log("InforceIntelligence display");
  }
}

class PolicyIntelligence extends ServiceIntelligence {
  public getData(): void {
    console.log("PolicyIntelligence getData");
  }

  public display(): void {
    console.log("PolicyIntelligence display");
  }
}

new InforceIntelligence().performTask();
new PolicyIntelligence().performTask();
