'use strict';
export default function (app) {
    var intervalID = 0;

    this.resetInterval = function () {
        if (intervalID) {
            clearInterval(intervalID);
            intervalID = null;
            app.seconds = 0;
        }
        intervalID = this.initInterval();
    };

    this.initInterval = function () {
        return setInterval(function () {
            if (app.timeLeft) {
                app.seconds++;
                var percent = 100 * ((app.timeLeft - 1) / app.sessionSeconds);
                var elemBar = document.querySelector('.controls-wrapp i.front-lasts');
                elemBar.style.height = percent + '%';
            }
        }, 1000);
    };

    this.clearInterval = function () {
        if (intervalID) {
            clearInterval(intervalID);
        }
    }
}
