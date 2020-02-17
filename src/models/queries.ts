import Battle from "./battle";

export async function battleStatistics() {
  return await Battle.aggregate([
    {
      $facet: {
        // Get the most repeated attacker king
        attackerKing: [
          {
            $sortByCount: "$attacker_king"
          },

          {
            $sort: {
              count: -1
            }
          },
          {
            $limit: 1
          },
          { $project: { attackerKing: "$_id" } }
        ],
        // Get the king which participated most defensive battles
        defenderKing: [
          {
            $sortByCount: "$defender_king"
          },

          {
            $sort: {
              count: -1
            }
          },
          {
            $limit: 1
          },
          { $project: { defenderKing: "$_id" } }
        ],
        // Get the region which had the most battles
        region: [
          {
            $group: {
              _id: "$region",
              count: { $sum: 1 }
            }
          },
          {
            $sort: {
              count: -1
            }
          },
          {
            $limit: 1
          },
          { $project: { region: "$_id" } }
        ],
        // Get the number of won soldiers in battles which were won
        win: [
          {
            $match: { attacker_outcome: "win" }
          },
          {
            $group: {
              _id: null,
              attacker_outcome_win: { $sum: "$attacker_size" }
            }
          }
        ],
        // Get the numbers of lost soldiers in batttles which were lost
        loss: [
          { $match: { attacker_outcome: "loss" } },
          {
            $group: {
              _id: null,
              attacker_outcome_loss: { $sum: "$attacker_size" }
            }
          }
        ],
        //   Get unique battle types
        battleTypes: [
          { $match: { battle_type: { $nin: [null, ""] } } },
          { $group: { _id: "$battle_type" } },
          { $project: { name: "$_id" } }
        ],
        // Get statistics for defenders
        defenderSize: [
          { $match: { defender_size: { $type: "int" } } },
          {
            $group: {
              _id: null,
              average: { $avg: "$defender_size" },
              minimum: { $min: "$defender_size" },
              maximum: { $max: "$defender_size" }
            }
          }
        ]
      }
    },
    {
      //   Put everything to one object
      $replaceWith: {
        $mergeObjects: [
          {
            $arrayElemAt: ["$attackerKing", 0]
          },
          {
            $arrayElemAt: ["$defenderKing", 0]
          },
          {
            $arrayElemAt: ["$region", 0]
          },
          {
            $arrayElemAt: ["$win", 0]
          },
          {
            $arrayElemAt: ["$loss", 0]
          },
          {
            battleTypes: "$battleTypes"
          },
          { $arrayElemAt: ["$defenderSize", 0] }
        ]
      }
    }
  ]);
}
