const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let testRover = new Rover(25);
    expect(testRover.position).toEqual(25);
    expect(testRover.mode).toEqual("NORMAL");
    expect(testRover.generatorWatts = 110);
  });

  it("response returned by receiveMessage contains name of message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let testMessage = new Message("Name of Test Message", commands);
    let testRover = new Rover(98382);
    expect(testRover.receiveMessage(testMessage).message).toEqual("Name of Test Message");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let testMessage = new Message("Name of Test Message", commands);
    let testRover = new Rover(98382);
    expect(testRover.receiveMessage(testMessage).results.length).toEqual(2);
  });

  it("responds correctly to status check command", function(){
    let commands = [new Command('STATUS_CHECK')];
    let testMessage = new Message("Checking status", commands);
    let testRover = new Rover(98382);
    expect(Object.keys(testRover.receiveMessage(testMessage).results[0])).toContain("roverStatus");
    expect(testRover.receiveMessage(testMessage).results[0].roverStatus).toEqual({mode: testRover.mode, generatorWatts: testRover.generatorWatts, position: testRover.position});
  });

  it("responds correctly to mode change command", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let testMessage = new Message("Changing modes", commands);
    let testRover = new Rover(98382);
    testRover.receiveMessage(testMessage);
    expect(testRover.mode).toEqual('LOW_POWER');
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 69420)];
    let testMessage = new Message("Changing mode and moving", commands);
    let testRover = new Rover(98382);
    testRover.receiveMessage(testMessage);
    expect(testRover.receiveMessage(testMessage).results[1].completed).toEqual(false);
  });

  it("responds with position for move command", function(){
    let commands = [new Command('MOVE', 4321)];
    let testMessage = new Message("Moving", commands);
    let testRover = new Rover(100)
    testRover.receiveMessage(testMessage);
    expect(testRover.position).toEqual(4321);
  });

});


// results: [
//   {
//     completed: true,
//     roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
//   }
// ]