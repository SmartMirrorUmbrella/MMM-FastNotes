# MMM-Notes

Module for [MagicMirror](https://github.com/MichMich/MagicMirror). Can be used for adding notes on MagicMirror.

## Dependencies

* [MagicMirror](https://github.com/MichMich/MagicMirror)
* [sqlite3](http://npmjs.com/package/sqlite3)
* Python 3.6 or higher

## Installation

```bash
cd ~/MagicMirror/modules
git clone https://github.com/SmartMirrorUmbrella/MMM-Notes.git
cd MMM-Notes
npm install sqlite3
```

## Configuration

Here is example of config, that must be placed in `config.js` file in array `modules`.

```js
let config = {
    ...
    modules: [
        ...
        {
            module: "MMM-Notes",
            position: "top_left"
        },
        ...
    ]
}
```

*Ellipsis represent code not seen.*
