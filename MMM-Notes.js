Module.register("MMM-Notes", {
    /**
     * Start the module.           
     * Notifies mycroft to send posts from database.     
     */
    start: function () {
        this.notepad =  [];
        this.sendSocketNotification("INIT", {});
        this.sendNotification("MYCROFT_COMMAND", {
            eventName: "notes-skill:get_all_posts",
            data: {}
        });   
    },

    /**
     * Listens for notifications and acts accordningly.          
     * @param {string} notification - the notification that was sent.           
     * @param {any} payload - the payload of the notification.           
     */
    socketNotificationReceived: function (notification, payload) {
        if (notification === "NEW-POST") {
            this.notepad.push(payload.post)
        } else if (notification === "ALL-POSTS") {
            this.notepad = payload.posts;
        } else if (notification === "DELETE-POSTS") {
            this.notepad = [];
        } 
        this.updateDom();
    },

    /**
     * Listens for notifications and acts accordningly.     
     * @param {Object} details - The details of the install.       
     */
    notificationReceived: function(notification, payload, sender) {
        if (notification === "MYCROFT_CONNECTED") {
            this.sendNotification("MYCROFT_COMMAND", {
                eventName: "notes-skill:get_all_posts",
                data: {}
            });
        }
    },

    /**
     * Returns a DOM element that contains the notepad.           
     * @returns {HTMLElement} - the notepad element.           
     */
    getDom: function () {
        var wrapper = document.createElement("div");
        const noteList = document.createElement('ul');
        wrapper.innerHTML = "";
        this.notepad.sort((a, b) => b[0] - a[0])
        if (this.notepad.length > 0) {
            this.notepad.forEach((item) => {
                const note = document.createElement('li');
                note.innerText = item[2];
                noteList.appendChild(note);
            });
            noteList.sor
            wrapper.appendChild(noteList);
        } else {
            wrapper.innerHTML = "No Notes...";
        }
        return wrapper;
    }
});
