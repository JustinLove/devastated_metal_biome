# Devastated Metal Biome

Adds a lot of craters (and a number of unit cannons, because, hey, it was a war zone) Devastation varies with water height; if you convert a regular metal planet it has water height 0 and you won't see any craters.

Additional biome - this one isn't shipped with the game, and a server mod will be required to play it.  Repo is client mod currently; change the type and identifier if you are copying it over.

## Development

The generated project includes a `package.json` that lists the dependencies, but you'll need to run `npm install` to download them.

PA will upload **all files** in the mod directory, including `node_modules` and maybe even `.git` - you probably don't want to use this in `server_mods` directly, unless you really like waiting.  The template is set up run to run as a project within a peer directory of `server_mods` - I use `server_mods_dev/mod_name`.  The task `grunt copy:mod` will copy the mod files to `../../server_mods/identifier`, you can change the `modPath` in the Gruntfile if you want to run it from somewhere else.

### Available Tasks

- copy:unitFiles - copy json files into the mod, with optional filename regexp
- copy:mod - copy the mod files into server_mods
- proc:health - process unit files; set up for double health as an example.  Expectation is that several proc:X tasks will me made.
- jsonlint - lint all the mod json files
- default: jsonlint
