Module.register("MMM-FastNotes", {
    defaults: {
        // updateInterval: 5000, // request DB every N miliseconds (5 sec by default)
        pythonPath: 'python3',  // shell command or path to Python 3.6 (or higher) binary
        // css: 0,  // 0 - current default MM CSS styles; 1 - custom css stile
        // TextStyle could be "xsmall bright" or "medium bright" or another one defined in /home/pi/MagicMirror/css/main.css, or in your own custom CSS
        contentTextStyle: "normal dimmed", // style for Note Content
        // animationSpeed: 2.5 * 1000,  // speed of text fading and changing in 2.5 sec
    },

    start: function () {
        this.sendSocketNotification("START_FAST_NOTES");
        this.notepad = [];
        this.updateDom()
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "DATABASE") {
            this.notepad = payload;
            this.updateDom()
            console.log("Notification received!")
        } 
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        const noteList = document.createElement('ul');
        wrapper.innerHTML = "";
        if (this.notepad.length > 0) {
            console.log("Notepad longer than 0")
            this.notepad.forEach((item) => {
                const note = document.createElement('li');
                note.innerText = item.Text;
                note.className = this.config.contentTextStyle;
                noteList.appendChild(note);
            });
            wrapper.appendChild(noteList);
        } else {
            console.log("Notepad is 0")
            wrapper.innerHTML = "No Notes...";
        }
        return wrapper;
    }
});