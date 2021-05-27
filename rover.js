class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110
    }

    receiveMessage(message){
      let resultsArray = [];
      let roverStatus = {
          mode: this.mode,
          generatorWatts: this.generatorWatts,
          position: this.position
        }
      for (let i = 0; i < message.commands.length; i++){
        if(message.commands[i].commandType === "STATUS_CHECK"){
          resultsArray.push({completed: true, roverStatus});
        } else if (message.commands[i].commandType === "MODE_CHANGE"){
            this.mode = message.commands[i].value;
            roverStatus.mode = message.commands[i].value;
            resultsArray.push({completed: true});
        } else if (message.commands[i].commandType === "MOVE" && this.mode === "NORMAL"){
            this.position = message.commands[i].value;
            roverStatus.position = message.commands[i].value;
            resultsArray.push({completed: true});
        } else {
          resultsArray.push({completed: false});
        }
      }
      let messageObj = {
        message: message.name,
        results: resultsArray,
      }
      return messageObj
    }   
}
module.exports = Rover;