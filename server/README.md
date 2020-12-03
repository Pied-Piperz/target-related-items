'/api/games/one'
ORIGINAL: Not scalable. It requests the entire database, then performs an operation based on its length.
REFACTORED: Given that I will update the schema to include an id that goes from 0 to one less than 10m, I can generate the random number and then find one particular game.

'/api/games/:sku/similar'
ORIGINAL: Not scalable. It requests the entire database, then performs operations on it.
REFACTORED: I could take the id and compare it to 21 less than 10m. If it is less, then I can take the 20 games with the next 20 ids. If it is more than or equal to 10m-21, I can take the previous 20 games.

'/api/games/:sku/together'
ORIGINAL: Not scalable. It requests every game that is on a system, which is going to be millions in this case.
REFACTORED: I could take the id and compare it to 2 less than 10m. If it is less, then I can take the 20 games with the next 2 ids. If it is more than or equal to 10m-21, I can take the previous 2 games.

'/api/games/:sku/oneBySku'
Finds one game based on its sku.

'/api/games/readAll'
Finds all games.

'/api/games/readBySystem'
Finds all games based on one system.

'/api/games/create'
Creates a game.

'/api/games/:id/delete'
Deletes a game.

'/api/games/:id/updateName'
Updates a games name.