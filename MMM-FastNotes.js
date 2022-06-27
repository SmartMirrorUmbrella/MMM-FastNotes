Module.register("MMM-FastNotes", {
    defaults: {
        updateInterval: 5000, // request DB every N miliseconds (5 sec by default)
        pythonPath: 'python3',  // shell command or path to Python 3.6 (or higher) binary
        css: 0,  // 0 - current default MM CSS styles; 1 - custom css stile
        // TextStyle could be "xsmall bright" or "medium bright" or another one defined in /home/pi/MagicMirror/css/main.css, or in your own custom CSS
        contentTextStyle: "normal dimmed", // style for Note Content
        animationSpeed: 2.5 * 1000,  // speed of text fading and changing in 2.5 sec
    },

    start: function () {
        //started at module loading
        this.sendSocketNotification("START_FAST_NOTES", this.config);
        this.todoList = [];
        this.updAnimationSpeed = 0;
        this.startUpdateLoop();
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "DATABASE") {
            if (this.todoList != payload) {
                this.todoList = payload;
                this.updAnimationSpeed = this.config.animationSpeed;
            }
            else{
                this.updAnimationSpeed = 0;
            }
        }
    },

    // Gets correct css file from config.js
    getStyles: function () {
        if (this.config.css == 0) {
            return ["modules/MMM-FastNotes/css/default.css"];
        }
        if (this.config.css == 1) {
            return ["modules/MMM-FastNotes/css/custom.css"];
        }
    },

    startUpdateLoop: function () {
        setInterval(() => {
            this.updateEvents()
        }, this.config.updateInterval + 2000);
    },

    updateEvents: function () {
        this.updateDom(this.updAnimationSpeed);
        this.updAnimationSpeed = 0;
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        const table = document.createElement('table');
        wrapper.innerHTML = "";
        if (this.todoList.length > 0) {
            this.todoList.forEach((item) => {
                // content of note
                const row = document.createElement('tr');
                row.innerText = item.Text;
                row.className = this.config.contentTextStyle;
                table.appendChild(row);
            });
            wrapper.appendChild(table);
        } else {
            wrapper.innerHTML = "No Notes...";
        }
        return wrapper;
    }
});