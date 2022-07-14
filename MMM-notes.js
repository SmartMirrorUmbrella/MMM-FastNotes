Module.register("MMM-notes", {
    start: function () {
        this.notepad =  [];
        this.sendSocketNotification("Initiate connection.");
        this.sendNotification("MYCROFT_COMMAND", {
            eventName: "notes-skill:get_all_posts",
            data: {}
        });   
    },

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

    notificationReceived: function(notification, payload, sender) {
        if (notification === "MYCROFT_CONNECTED") {
            this.sendNotification("MYCROFT_COMMAND", {
                eventName: "notes-skill:get_all_posts",
                data: {}
            });
        }
    },

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
