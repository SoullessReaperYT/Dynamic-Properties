// Importing the 'world' object from the Minecraft server API
import { world } from "@minecraft/server";

// Subscribing to the 'chatSend' event that occurs before a message is sent
world.beforeEvents.chatSend.subscribe((data) => {
    // If the message does not start with '.', exit the function
    if (data.message.startsWith('.') === false) return;

    // Cancel the message from being broadcast to other players
    data.cancel = true;

    // Storing the player who sent the message as 'sender'
    const sender = data.sender;

    // Extracting the command after the '.' by splitting the message
    const command = data.message.split('.')[1];

    // 'switch' statement to handle different commands
    switch (command) {
        case 'player': // If the command is 'player', execute the following code

            /**
             * @type {{isnuked: boolean, user: {name: string, uuid: string}}}
             * JSDoc type annotation: Describing the structure of the 'nuke' object
             */
            // Parsing the 'player' dynamic property to an object, or an empty object if not set
            const nuke = JSON.parse(sender.getDynamicProperty('player') ?? "{}");

            // Checking if the player has already been nuked (isnuked === true)
            if (nuke?.isnuked === true) {
                // Reset the player's dynamic property to indicate they are no longer nuked
                sender.setDynamicProperty('player', JSON.stringify({ isplayer: false, user: { name: '', uuid: '' } }));
                return;
            }

            // If the player is not nuked, mark them as nuked and store their name and UUID
            sender.setDynamicProperty('player', JSON.stringify({ isplayer: true, user: { name: sender.name, uuid: sender.id } }));

            // Get all players in the world and loop through each player
            world.getPlayers().forEach((player) => {
                // If the player has the 'staff' tag, don't kick them and send a message instead
                if (player.hasTag('staff')) return player.sendMessage("§cYou Have Not Been Kicked Because Your Staff");

                // Kick all non-staff players with a message about who nuked the world
                player.runCommandAsync(`kick "${player.name}" §c§lThe World Has Been Nuked By ${sender.name}`);
            });
            break;
    }
});

// Subscribing to the 'playerSpawn' event, which occurs after a player spawns in the world
world.afterEvents.playerSpawn.subscribe((data) => {
    // If it's not the player's initial spawn (respawn), exit the function
    if (data.initialSpawn === false) return;

    /**
     * @type {{isnuked: boolean, user: {name: string, uuid: string}}}
     * JSDoc type annotation: Describing the structure of the 'nuke' object for the spawning player
     */
    // Parsing the 'player' dynamic property to get nuke information for the player
    const nuke = JSON.parse(data.player.getDynamicProperty('player') ?? "{}");

    // If the player is not marked as nuked, exit the function
    if (nuke?.isnuked !== true) return;

    // Kick the player if they were marked as nuked, with a message about who nuked the world
    data.player.runCommandAsync(`kick "${data.player.name}" §c§lThe World Has Been Nuked By ${nuke.user.name}`);
});

// SECOND PART: Command starting with '!' instead of '.'

// Subscribing to the 'chatSend' event again for commands starting with '!'
world.beforeEvents.chatSend.subscribe((data) => {
    // If the message does not start with '!', exit the function
    if (data.message.startsWith('!') === false) return;

    // Cancel the message from being broadcast
    data.cancel = true;

    // Storing the sender (player) who sent the message
    const sender = data.sender;

    // Extracting the command after the '!' by splitting the message
    const command = data.message.split('!')[1];

    // Switch statement to handle the 'world' command
    switch (command) {
        case 'world': // If the command is 'world', execute the following code

            /**
             * @type {{isworld: boolean, user: {name: string, uuid: string}}}
             * JSDoc type annotation: Describing the structure of the 'worldState' object
             */
            // Fix: Renamed 'world' to 'worldState' to avoid conflict with the 'world' object
            const worldState = JSON.parse(world.getDynamicProperty('world') ?? "{}");

            // Checking if the world has already been nuked (isworld === true)
            if (worldState?.isworld === true) {
                // Reset the world dynamic property to indicate it is no longer nuked
                world.setDynamicProperty('world', JSON.stringify({ isworld: false, user: { name: '', uuid: '' } }));
                return;
            }

            // If the world is not nuked, mark it as nuked and store the sender's name and UUID
            world.setDynamicProperty('world', JSON.stringify({ isworld: true, user: { name: sender.name, uuid: sender.id } }));

            // Get all players in the world and loop through each player
            world.getPlayers().forEach((player) => {
                // If the player has the 'staff' tag, don't kick them and send a message instead
                if (player.hasTag('staff')) return player.sendMessage("§cYou Have Not Been Kicked Because Your Staff");

                // Kick all non-staff players with a message about who nuked the world
                player.runCommandAsync(`kick "${player.name}" §c§lThe World Has Been Nuked By ${sender.name}`);
            });
            break;
    }
});

// Subscribing to the 'playerSpawn' event again for world nuke logic
world.afterEvents.playerSpawn.subscribe((data) => {
    // If it's not the player's initial spawn, exit the function
    if (data.initialSpawn === false) return;

    /**
     * @type {{isworld: boolean, user: {name: string, uuid: string}}}
     * JSDoc type annotation: Describing the structure of the 'worldState' object
     */
    // Parsing the 'world' dynamic property to get world nuke information
    const worldState = JSON.parse(world.getDynamicProperty('world') ?? "{}");

    // If the world is not marked as nuked, exit the function
    if (worldState?.isworld !== true) return;

    // Kick the player if the world is marked as nuked, with a message about who nuked it
    data.player.runCommandAsync(`kick "${data.player.name}" §c§lThe World Has Been Nuked By ${worldState.user.name}`);
});
