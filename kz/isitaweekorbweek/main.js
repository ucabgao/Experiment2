function getKeyFromArray(array, date) {
    for (var i = 0; i < array.length; i++) {
        for (var key in array[i]) {
            if (key === date) {
                return i;
            }
            break;
        }
    }
}
function getKeyFromObject(array, key) {
    for (var date in array[key]) {
        return date;
        break;
    }
}
function getEarliestDateFromNow(array, now) {
    for (var i = 0; i < array.length; i++) {
        for (var key in array[i]) {
            if (key > now) {
                return key;
            }
            break;
        }
    }
}

var dates = [
    {"20150831":"A"}, // Michaelmas 2015 - Monday bug 20150831 from 20150902
    {"20150907":"B"},
    {"20150914":"A"},
    {"20150921":"B"},
    {"20150928":"A"},
    {"20151005":"B"},
    {"20151012":"A"},
    {"20151103":"B"}, // Michaelmas HT 2015 - TODO: Monday bug 20151102
    {"20151109":"A"},
    {"20151116":"B"},
    {"20151123":"A"},
    {"20151130":"B"},
    {"20151207":"A"},
    {"20151214":"B"},
    {"20160105":"A"} // Lent 2015 - TODO: Monday bug 20160104
];
var now = moment();
var thisMonday = moment().isoWeekday(1).format("YYYYMMDD");

var thisArrayKey = getKeyFromArray(dates, thisMonday);
var thisObjectKey = getKeyFromObject(dates, thisArrayKey);
try {
    var thisWeek = dates[thisArrayKey][thisObjectKey];
} catch(err) {
}

if (thisWeek === "A") {
    document.getElementById("answer").innerHTML = "It's an A week.";
} else if (thisWeek === "B") {
    document.getElementById("answer").innerHTML = "It's a B week.";
} else {
    document.getElementById("answer").innerHTML = "Neither.";
}


var nextDate = getEarliestDateFromNow(dates, now.format("YYYYMMDD"));
var nextMoment = moment(nextDate, "YYYYMMDD");
var nextWeek = dates[getKeyFromArray(dates, nextDate)][nextDate];
if (nextWeek === "A") {
    document.getElementById("next").innerHTML = "<b>" + nextWeek + " week</b> starts in <b><span id=\"countdown-timer\"></span></b>.";
} else if (nextWeek === "B") {
    document.getElementById("next").innerHTML = "<b>" + nextWeek + " week</b> starts in <b><span id=\"countdown-timer\"></span></b>.";
} else {
    document.getElementById("next").innerHTML = "Error - Please email me at <a href=\"mailto:updatethissite@iamkelv.in\">updatethissite@iamkelv.in</a> and tell me to update this site!";
}

var timer = document.getElementById("countdown-timer");
timer.innerHTML = nextMoment.countdown(now).toString();
setInterval(function() {
	timer.innerHTML = nextMoment.countdown(moment()).toString();
}, 1000);
