# got-api
A simple API to get results of Game of Thrones battles

# Start application
## Development
1. In console run command: ``` npm run dev```

## Production
1. In console run command: ``` npm run build```
2. In console run command: ``` npm run start```

# Endpoints

* /list - returns list(array) of all the places where battle has taken place.
* /count - returns total number of battles occurred.
* /stats - returns most important statistics
* /search?query - can search with custom parameters:
    * "/search?king=Robb Stark", return list of battles were 'attacker_king' or 'defender_king' was 'Robb Stark
    * "/search?king=Robb Stark&location=Riverrun&type=siege", can also use multiple queries
