Module.register("MMM-Notes", {
    /**
     * Start the module.           
     * Notifies mycroft to send posts from database.     
     */
    start: function () {
        this.notepad =  {};
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
            this.notepad[payload.post[0]] = {title: payload.post[1], content: payload.post[2]}
        } else if (notification === "ALL-POSTS") {
            this.notepad = {}
            payload.posts.forEach((post) => {
                this.notepad[post[0]] = {title: post[1], content: post[2]}
            })
        } else if (notification === "DELETE-POST") {
            delete (this.notepad[payload.id])
        } else if (notification === "DELETE-POSTS") {
            this.notepad = {};
        } 
        this.updateDom();
    },

    /**
     * Listens for notification and acts accordingly.    
     * @param {Object} notification - The notification received.       
     * @param {Object} payload - The payload of the notification.       
     * @param {Object} sender - The sender of the notification.       
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
     * Returns the DOM element that contains the notepad.           
     * @returns {HTMLElement} The DOM element that contains the notepad.           
     */
    getDom: function () {
        var table = document.createElement("table");
        if (Object.keys(this.notepad).length > 0) {
            const tableBody = document.createElement('tbody');
            counter = 0
            for (const [key, value] of Object.entries(this.notepad).sort((a, b) => b[0] - a[0])) {
                const row       = document.createElement("tr")
                const id        = document.createElement("td")
                const content   = document.createElement("td")
                
                id.setAttribute("align", "right")
                id.setAttribute("width", "1")
                id.appendChild(document.createTextNode(`${key}. `))
                content.appendChild(document.createTextNode(value.content))
                row.appendChild(id)
                row.appendChild(content)
                tableBody.appendChild(row)
                if (++counter > 7) break
            }
            table.appendChild(tableBody)
        } else {
            table.innerHTML = "No notes";
        }
        return table;
    }
});
