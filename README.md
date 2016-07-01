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
 -l, --location Give latitude,longitude instead of station as the parameter.
```

### CoreLocationCLI and other CLI location tools

You can pretty easily use tools like 
[CoreLocationCLI](https://github.com/fulldecent/corelocationcli) to get nearest
stations. Just give *--location* option and provide latitude and longitude instead of
station. 

```
CoreLocationCLI -once yes -format '%latitude,%longitude'|xargs node cli.js --location
```

### Tmux

You could use this with tmux with command like this:

````
tmux set -g status-left ‘#[fg=green]#(cli-hsl-bike -s "Karhupuisto")‘
````

I suggest that you set your status update interval to be a minute or maybe slower.


