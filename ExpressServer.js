"use strict";

const express = require("express");
const app = express();
app.use(express.json());

let candidates = [];

/* 

res.body format for candidates:

{
  "id": "ae588a6b-4540-5714-bfe2-a5c2a65f547a",
  "name": "John Coder",
  "skills": [ "javascript", "es6", "nodejs", "express" ]
}

query-string format for /candidates/search:
Skills in the inline csv format can be altered to fit candidate search.

localhost:3000/candidates/search?skills=javascript,es6,nodejs,express

*/

//Adding a posted candidate to candidates array
app.post("/candidates", function (req, res) {
  const candidate = req.body;
  try {
    candidates.push(candidate);
  } catch (error) {
    res
      .sendStatus(500)
      .send("Error: " + error)
      .socket.end();
  }
  res.sendStatus(200).socket.end();
});

//Finding candidate with the most skills
//Currently returns/sends the first candidate with the most skills, but can be altered to return all candidates with relevant skills in an array, or many other data-sets pased on preference.
app.get("/candidates/search", function (req, res) {
  try {
    let { skills } = req.query;
    skills = skills.split(",");
    const length = skills.length;

    let candidatesWithSkills = [];

    candidates.forEach((candidate) => {
      let validSkills = 0;
      let candidateValidSkills = [];

      for (let i = 0; i < length; i++) {
        if (candidate.skills.includes(skills[i])) {
          validSkills++;
          candidateValidSkills.push(skills[i]);
        }
      }

      if (
        !candidatesWithSkills[0] ||
        validSkills > candidatesWithSkills[0].validSkills
      ) {
        candidatesWithSkills.shift();
        candidatesWithSkills.push({
          ...candidate,
          validSkills,
          candidateValidSkills,
        });
      }
    });

    res.send({ candidate: candidatesWithSkills }).socket.end();
  } catch (error) {
    console.log("Error: " + error);
    res.sendStatus(500).socket.end();
  }
});

app.listen(process.env.HTTP_PORT || 3000);
