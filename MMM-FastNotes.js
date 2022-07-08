Module.register("MMM-FastNotes", {
    // defaults: {
    //     // contentTextStyle: "normal dimmed", // style for Note Content
    // },

    start: function () {
        this.sendSocketNotification("HEJ");
        this.notepad = [];
        console.log(0)
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "NEW-POST") {
            this.notepad.push(payload.post)
        } else if (notification === "ALL-POSTS") {
            this.notepad = payload.posts;
        } else if (notification === "DELETE-POSTS") {
            this.notepad = [];
        }
        console.log(payload)
        console.log(1)
        this.updateDom();
    },

    notificationReceived: function(notification, payload, sender) {
        if (notification === "MYCROFT_CONNECTED") {
            console.log(10)
            this.sendNotification("MYCROFT_COMMAND", {
                eventName: "fastnotes-skill:get_all_posts",
                data: {}
            });
        }
    },

    getDom: function () {
        console.log(2)
        var wrapper = document.createElement("div");
        const noteList = document.createElement('ul');
        wrapper.innerHTML = "";
        if (this.notepad.length > 0) {
            console.log(3)
            this.notepad.forEach((item) => {
                const note = document.createElement('li');
                note.innerText = item;
                noteList.appendChild(note);
            });
            wrapper.appendChild(noteList);
        } else {
            console.log(4)
            wrapper.innerHTML = "No Notes...";
        }
        console.log(5)
        return wrapper;
    }
});