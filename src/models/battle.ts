import mongoose from "mongoose";

const battleSchema = new mongoose.Schema({
  name: {
    type: "string",
    year: "number",
    battle_number: "number",
    attacker_king: "string",
    defender_king: "string",
    attacker_1: "string",
    attacker_2: "string",
    attacker_3: "string",
    attacker_4: "string",
    defender_1: "string",
    defender_2: "string",
    defender_3: "string",
    defender_4: "string",
    attacker_outcome: "string",
    battle_type: "string",
    major_death: "number",
    major_capture: "number",
    attacker_size: "number",
    defender_size: "number",
    attacker_commander: "string",
    defender_commander: "string",
    summer: "number",
    location: "string",
    region: "string",
    note: "string"
  }
});

export default mongoose.model("Battle", battleSchema, "all-battles");
