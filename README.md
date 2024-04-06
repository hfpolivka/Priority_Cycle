## **Priority Cycle Chrome Extension**

### How to Set Up

+ Clone repository to desired location.
+ Open Google Chrome, click the three dots in the upper right, and go to Extensions.
+ Enable Developer Mode in the upper right, then click 'Load Unpacked'.
+ Select the folder (that was just cloned) for the extension and pin it to the search bar for convenience.

<br>

### Purpose

The Priority Cycle Chrome Extension was designed to assist in managing skill stacking and project development. The extension has two lists: one to keep track of current skills, and one to keep track of current projects. It is also equipped with a Pomodoro timer, in the hopes that at least a spare half hour can be found each day.

This extension was created to be flexible (as days don't always go as planned), and it is nearly impossible to plan down to the minute and keep that routine. With this extension, spare time can be utilized easily, and the extension can give an indication of which skill or project to work on next.

<br>

### The User Interface

The Priority Cycle has two interactive lists for skills and projects respectively. These lists can be populated with whatever the user wants, and can be reordered easily. Each list has three buttons (in order): adding items to the respective list, hiding the respective list, and iterating to the next item in the respective list. The first item in each list is displayed at the top of the container, and indicates which skill/project should be worked on next.

The extension also comes with a Pomodoro timer that can run for 25 minutes or 5 minutes depending on the period. The timer has three buttons as well (in order): start the work period (25 min), start the break period (5 min), and reset the timer. Underneath these buttons is the display for the countdown itself.

<br>

### Technologies Used and Why

<ins>Sortable.js</ins> : This library was used to implement the reorder functionality for the lists, so that the user can arrange their items however they see fit.<br>
<br>
<ins>Chrome Local Storage</ins> : This function of the Chrome browser allows items in each list to be stored in Chrome so that they are not lost on reload (localStorage). It also helps manage values for the timer (chrome.storage.local).<br>
**NOTE** : Two different declarations of Chrome's storage are declared in this project and do not work the exact same way.<br>
<br>
<ins>Chrome Notifications</ins> : This function of the Chrome browser allows for notifications to be sent directly to the Windows notification center (this.registration.showNotification). This is utilized when each of the timers end, sending a message to the user upon completion.<br>
<br>
<ins>Chrome Alarms</ins> : This function of the Chrome browser allows for alarms to act as prompts for code execution. This is utilized to launch the notifications when each timer ends.

<br>

### Color Scheme
+ red: rgb(235,80,59)
+ red-orange: rgb(240,127,62)
+ orange: rgb(247,168,41)
+ orange-yellow: rgb(253,201,14)
+ yellow: rgb(254,230,45)
