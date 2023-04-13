const FootballModel = require("../model/footballModel");


const getTeams = async (req, res) => {
  try {
    const teams = await FootballModel.getTeams();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(teams));
  } catch (e) {
    console.log(e.message);
  }
};

const getTeam = async (req, res, id) => {
  try {
    const teamID = await FootballModel.getTeam(id);
    if (!teamID) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Team not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(teamID));
    }
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(error.message);
  }
};

const createTeam = async (req, res) => {
  try {
    // create a fake object having some data
    const bodyData = {
      club: "sevilla",
      player: 25,
      country: "Spain",
    };

    const newTeam = await FootballModel.createTeam(bodyData);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newTeam));
  } catch (error) {
    console.log(error.message);
  }
};

// creating a dynamic team
const createDynamicTeam = async (req, res) => {
  try {
    let body = "";
    req.on("data", function (chunk) {
      body += chunk.toString();
    });
    req.on("end", async function () {
      const { club, player, country } = JSON.parse(body);
      const bodyData = {
        club,
        player,
        country,
      };
      const newTeam = await FootballModel.createDynamicTeam(bodyData);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newTeam));
    });
  } catch (error) {
    console.log(error.message);
  }
};

// create update function
const updateTeam = async (req, res, id) => {
  try {
    const getID = await FootballModel.updateTeam(id);
    if (!getID) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: `Team with id: ${getID} does not exist` })
      );
    }
    {
      let body = "";
      req.on("data", function (chunk) {
        body += chunk.toString();
      });
      req.on("end", async function () {
        // destructure the body JSON to javascript object
        const { club, player, country } = JSON.parse(body);
        // create the object model
        const bodyData = {
          club: club || getID.club,
          player: player || getID.player,
          country: country || getID.country,
        };
        // save/update the object
        const updatedTeam = await FootballModel.updateTeam(id, bodyData);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updatedTeam));
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// create a function that removes a team
const deleteTeam = async (req, res, id) => {
  try {
    const teamID = await FootballModel.deleteTeam(id);
    if (!teamID) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: `Team with ID ${id} is not available` })
      );
    } else {
      await FootballModel.remove(teamID);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Team removed successfully" }));
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getTeams,
  getTeam,
  createTeam,
  createDynamicTeam,
  updateTeam,
  deleteTeam,
};