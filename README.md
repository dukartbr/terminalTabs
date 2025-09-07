## Terminal Tabs

### Riff while you code

To install use:

```
npm i terminalguitartabs
```

Place your tabs in the `tabs` folder

To use in CLI:

```
terminalTabs
```

Using the following schema, terminalTabs will place your guitar tab in the terminal

```
{
	"name": "Song Title",
	"notes": [
		{
			"beat": 0,
			"string": 3,
			"fret": 5
		}
	]
}
```

### TODO:

- Add Measure markers
- Add measure value to note object
- Format with note duration considered
