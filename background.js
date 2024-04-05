// define alarm for timer
chrome.alarms.create("pomodoroTimer", {
    periodInMinutes: 1 / 60,			                                                    // pings every minute
})

// 'timer' stores total seconds elapsed
// 'timeOption' stores which interval
// 'isRunning' stores if timer is running/not

// handle timer in background
chrome.alarms.onAlarm.addListener((alarm) => {
    // timer alarm functionality
    if (alarm.name === "pomodoroTimer") {
        chrome.storage.local.get(["timer", "timeOption", "isRunning"], (res) => {           // read from storage
            if (res.isRunning) {
                let timer = res.timer + 1;		                                            // increment timer until timeOption is reached
                let isRunning = true;
                if (timer === 60 * res.timeOption) {
                    if (res.timeOption === 25) {
		    	        this.registration.showNotification("Work Timer", {                  // alert for work timer
                        	body: `Good work! Take 5:)`,
                        	icon: "images/play.png",
                    	});
		            } else if (res.timeOption === 5) {
			            this.registration.showNotification("Break Timer", {                 // alert for break timer
                        	body: `Let's keep building!`,
                        	icon: "images/time.png",
                    	});
		            }
                    // reset timer
                    timer = 0;
                    isRunning = false;
                }
                // save current timer settings
                chrome.storage.local.set({
                    timer,
                    isRunning,
                })
            }
        })
    }
});

// set storage values if they do not exist
chrome.storage.local.get(["timer", "timeOption", "isRunning"], (res) => {
    chrome.storage.local.set({
        timer: "timer" in res ? res.timer : 0,
        timeOption: "timeOption" in res ? res.timeOption : 25,
        isRunning: "isRunning" in res ? res.isRunning : false,
    })
});