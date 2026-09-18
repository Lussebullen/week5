// Express is provided at runtime by the project's dependencies.
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

type Party = {
  id: number;
  name: string;
  leader: string;
  seats: number;
};

type BookParams = {
  id: string;
};

//Swedish political parties data
let parties: Party[] = [
  { id: 1, name: "Sociademokraterna", leader: "Magdalena Andersson", seats: 99 },
  { id: 2, name: "Moderaterna", leader: "Ulf Kristersson", seats: 70 },
  { id: 3, name: "Sverigedemokraterna", leader: "Jimmie Åkesson", seats: 62 },
  { id: 4, name: "Vänsterpartiet", leader: "Nooshi Dadgostar ", seats: 30 },
  { id: 5, name: "Centerpartiet", leader: "Elisabeth Thand Ringqvist ", seats: 25 },
  /* 
  { id: 6, name: "Kristdemokraterna", leader: "Ebba Bush Thor", seats: 22 }
  { id: 7, name: "Miljöpartiet", leader: "Amanda Lind", seats: 22 }
  { id: 6, name: "Liberalerna", leader: "Simona Mohamsson", seats: 24 }
   */
];

app.get("/parties", (req, res): void => {
  res.json(parties);
});

app.post("/addnew", (req, res) => {
  const newParty: Party = {
    id: parties.length + 1,
    name: req.body.name,
    leader: req.body.leader,
    seats: req.body.seats
  };
  parties.push(newParty);
  res.json({ message: "The party was added successfully", party: newParty });
});

app.put("/party/:id", (req, res): void => {
  const partyId: number = parseInt(req.params.id);
  const party = parties.find((party) => party.id === partyId);
  if (!party) {
    res.status(404).json({ message: "No party was found with id number:" + " " + partyId });
    return;
  }
  party.name = req.body.name || party.name;
  party.leader = req.body.leader || party.leader;
  party.seats = req.body.seats || party.seats;
  res.json({ message: "Party updated successfully", party });
});

app.delete("/party/:id", (req, res): void => {
  const partyId: number = parseInt(req.params.id);
  parties = parties.filter((party) => party.id !== partyId);
  res.json({ message: "Party deleted successfully" });
});

//Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



