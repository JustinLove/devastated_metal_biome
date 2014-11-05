# Devastated Metal Biome

Adds a lot of craters. This biome type can also have height variation (bent out of shape)

There are unit canons scattered around.  Unlike other biomes where these are mere terrain, these canons can be reclaimed for significant metal.

Additional biome - this one isn't shipped with the game, and a server mod will be required to play it.  The repo is set up as a client mod, the grunt task 'server' will copy files over.

## Development

The generated project includes a `package.json` that lists the dependencies, but you'll need to run `npm install` to download them.

PA will upload **all files** in the mod directory, including `node_modules` and maybe even `.git` - you probably don't want to use this in `server_mods` directly, unless you really like waiting.  The template is set up run to run as a project within a peer directory of `server_mods` - I use `server_mods_dev/mod_name`.  The task `grunt copy:mod` will copy the mod files to `../../server_mods/identifier`, you can change the `modPath` in the Gruntfile if you want to run it from somewhere else.

### Available Tasks

- copy:biome - copy the stock metal files into the mod directory
- proc - devastate the biome files
- jsonlint - lint all the mod json files
- copy:mod - copy the mod files into server_mods
- copy:modinfo - copy and update modinfo.json into server_mods
- server - copy all required files into server_mods (combines above two)
- default: proc, jsonlint
