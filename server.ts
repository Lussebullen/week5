// Express is provided at runtime by the project's dependencies.
import express from "express";

const app = express();
const PORT = 3000;

// When someone visits the root URL, send them a friendly message
app.get("/", (req, res) => {
  res.send("Welcome to my game hub! Visit /menu to see the games route.");
});

//Middleware to parse JSON bodies
app.use(express.json());

//Second route to handle timestamps
//Note that routes like these must be defined before the server starts listening, otherwise they won't be reachable.
app.get("/menu", (req, res) => {
  res.json({ 
    menu_1: {strategy: ["Civilization VI", "Stellaris", "Eternal Darkness"]},
    menu_2: {simulations: ["Call of Duty", "Assassin's Creed", "Grand Theft Auto"]},
    menu_3: {action: ["The Witcher 3", "Final Fantasy VII", "Skyrim", "Dragon Age"]},
    lastVisited: new Date().toISOString().split("T")[0], // Get the date part of the ISO string
    });
});

//Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



