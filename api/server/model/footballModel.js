let FootballData = require("../data/dummy.json")
const { v4: uuidv4 } = require("uuid");
const { writeToFile } = require("../utils");

const  getTeams= ()=>{
      return new Promise((resolve, reject) => {
        resolve(FootballData);
      });
}

const getTeam = (id)=>{
   return new Promise((resolve, reject) => {
     const team = FootballData.find((t) => t.id === id);
     resolve(team);
   });
}

const createTeam = (team) => {
  return new Promise((resolve, reject) => {
    // get an id for the new team
    const teamID = { id: uuidv4(), ...team };
    // add the newTeam to the previous array using its id.
    FootballData.push(teamID);
    // write the new array to a file
    writeToFile("./data/dummy.json", FootballData);
    resolve(teamID);
  });
};

const createDynamicTeam = (team) => {
  return new Promise((resolve, reject) => {
    // get an id for the new team
    const teamID = { id: uuidv4(), ...team };
    // add the newTeam to the previous array using its id.
    FootballData.push(teamID);
    // write the new array to a file
    writeToFile("./data/dummy.json", FootballData);
    resolve(teamID);
  });
};

const updateTeam = (id, team) =>{
    return new Promise((resolve, reject) =>{
        // get the index of the object
        const index = FootballData.findIndex((f)=> f.id === id)
        // get the actual object based on its id and fields
        FootballData[index] = {id, ...team}
        // write the object to file
        writeToFile('./data/dummy.json', FootballData)
        // resolve the data
        resolve(FootballData[index])
    })
}

function deleteTeam(id) {
  return new Promise(function (resolve, reject) {
    // filter the object id
    team = FootballData.filter((f) => f.id !== id);
    // write to file
    writeToFile("./data/dummy.json", team);
    resolve();
  });
}