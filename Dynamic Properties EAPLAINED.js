// Explanation: What are dynamic properties?

/*
So, what are dynamic properties? They’re basically like databases that Minecraft uses to store information about different things like players, entities, worlds, or even items.

For example:
- You can save data to the world, or to entities like players or mobs, or even items like a stick.
- However, not all dynamic properties are accessible all the time.
  - Player data can only be accessed if that specific player is online.
  - For items, the data will be deleted if the item is destroyed, like being thrown into lava or despawning.
  - You can also remove data manually by setting it to null, which we’ll cover later.
  - There’s one type of dynamic property that is accessible at all times—world dynamic properties. These can only be deleted by your code.
*/

// Example 1: Setting Dynamic Properties

/*
Let’s start with how you set dynamic properties for players, entities, items, and the world.

The first argument is the key, which is a string. This key is super important because it's how you’ll access the dynamic property later.
*/

player.setDynamicProperty("key", 20); // Number
world.setDynamicProperty("key", 20);  // Number

player.setDynamicProperty("key", true); // Boolean
world.setDynamicProperty("key", true);  // Boolean

player.setDynamicProperty("key", "hey there"); // String
world.setDynamicProperty("key", "hey there");  // String

/*
To delete a dynamic property, you just need to set the key to null.
*/

player.setDynamicProperty("key", null); // Delete
world.setDynamicProperty("key", null);  // Delete

// Storing Objects and Arrays

/*
You can also store datasets like objects and arrays, but here’s the catch: Minecraft can't read them directly. This is where JSON.stringify() comes in handy.

It converts your object or array into a string so Minecraft can store it.

Here’s an example:
*/

player.setDynamicProperty('key', JSON.stringify({
  isplayer: true,
  user: { name: player.name, uuid: player.id }
}));

// Example 2: Getting Dynamic Properties

/*
Retrieving stored values is simple; you just need the key. For example:
*/

console.warn(player.getDynamicProperty("key"));

/*
This will return whatever value you set with that key.

Here’s a quick example:
*/

player.setDynamicProperty("youtube", "hey there");
console.warn(player.getDynamicProperty("youtube"));

/*
And of course, you can do the same thing for numbers and booleans.
*/

// Parsing Stored Data

/*
If you stored an object or array using JSON.stringify(), you need to use JSON.parse() to convert it back into a usable dataset. But, you have to be careful if the dynamic property is empty, or it will return undefined, causing errors.

Here’s how to handle that safely:
*/

JSON.parse(player.getDynamicProperty("key") ?? "{}");

/*
This will check if the data is undefined and return an empty object {} instead. If you're dealing with arrays, you can change the empty object to an empty array [] like this:
*/

JSON.parse(player.getDynamicProperty("key") ?? "[]");

// Getting All Dynamic Property Keys

/*
To get all the dynamic property keys stored on a player, you can use:
*/

console.warn(player.getDynamicPropertyIds());

/*
This will return an array of all the dynamic property keys.
*/

// Clearing Dynamic Properties

/*
To clear all dynamic properties, you have two options:
1. You can change the UUID of your behavior pack, which will reset all the dynamic properties.
2. You can use this code:
*/

world.clearDynamicProperties();

/*
This will delete all saved dynamic properties from the world.
*/

// Recap

/*
Here’s what you need to remember:
- Items: Dynamic properties can only be lost if the item is destroyed.
- Players: Player dynamic properties can only be accessed if the player is online.
- World: World dynamic properties are always accessible, but they can only be deleted via code.
You can also clear all dynamic properties by changing the behavior pack UUID.
*/

