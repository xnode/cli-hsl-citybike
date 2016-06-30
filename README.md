# CLI based interface for HSL city bike

Tool for querying HSL city bike public API.

## Installing

``` npm install -g ```

## Usage

```cli-hsl-bike [options] <station>````

By default it will list you the station asked and four other nearest stations to 
that station.

### Options

```
 -h, --help     output usage information
 -V, --version  output the version number
 -j, --json     Output JSON.
 -s, --simple   Output one result.
```

### Tmux

You could use this with tmux with command like this:

````
tmux set -g status-left ‘#[fg=green]#(cli-hsl-bike -s "Karhupuisto")‘
````

I suggest that you set your status update interval to be a minute or maybe slower.


