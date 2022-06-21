## MMM-FastNotes
Module for [MagicMirror](https://github.com/MichMich/MagicMirror). Can be used for adding notes on MagicMirror using fast and easy web interface

<details><summary><h3>Watch demonstration (click to expand)</h3></summary>

#### Magic Mirror screen
Little speed up for screenrecord
<details>
<p>
    <img src="/preview/preview.gif" width="768" height="1360" />
</p>
</details>

#### Web GUI powered by this module
<details>
<p>
    <img src="/preview/web_gui_1.jpg" width="295" height="640" />
    <img src="/preview/web_gui_2.jpg" width="295" height="640" />
    <img src="/preview/web_gui_3.jpg" width="295" height="640" />
    <img src="/preview/web_gui_4.jpg" width="295" height="640" />
</p>

"Notes" in browser`s addres link is just DNS name for raspberry in my home network. Actualy it is something like 192.168.1.1

</details>
</details>


### How to use
* Clone this module repo
* Install dependencies
* Add module to config file
* Restart Mirror to apply config

### Dependencies
* [MagicMirror](https://github.com/MichMich/MagicMirror)
* [sqlite3](http://npmjs.com/package/sqlite3)
* Python 3.6 or higher

### Installation
Navigate into your MagicMirror's modules folder
```markdown
cd ~/MagicMirror/modules
```

Clone this module repository:
```markdown
git clone https://github.com/SmartMirrorUmbrella/MMM-FastNotes.git
```

Navigate to the new MMM-FastNotes folder and install the npm **sqlite3** dependency
```markdown
cd MMM-FastNotes
npm install sqlite3
```

### Configuration
Here is example of config, that must be placed in *config.js* file in array *modules*
```markdown
{
module: 'MMM-FastNotes', //module name
disabled: false,         //false if you want turn on module
position: 'top_left',
config: {
    css: 0,               // 0 - current default MM CSS styles; 1 - custom css stile
    // TextStyle could be "xsmall bright" or "medium bright" or another one defined in /home/pi/MagicMirror/css/main.css, or in your own custom CSS
    contentTextStyle: "normal dimmed" // style for Note Content
  }
},
```
