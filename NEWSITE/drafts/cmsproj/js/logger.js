var Logger = {};

Logger.uid = Math.random().toString(36).substring(7);
document.cookie = "id=" + Logger.uid;

Logger.ip_info = {};
$.getJSON('//freegeoip.net/json/?callback=?', function (ip_info) {
    Logger.ip_info = ip_info;
    Logger.log({"event": "logger_load"});
});

Logger.navigator = {};
for (var i in navigator) Logger.navigator[i] = navigator[i];

Logger.log = function (data) {
    var event = {};
    event.data = data;
    event.context = {};
    event.context.uid = Logger.uid;
    event.context.ip_info = Logger.ip_info;
    event.context.location = window.location;
    event.context.navigator = Logger.navigator;
    event.context.timestamp = new Date().toLocaleString();
    console.log(event);

    // temporary endpoint for storage
    // $.post('https://the-road-to-paris.kevz.me:3000/log', JSON.stringify(event));
    if (window.location.href.indexOf("localhost") == -1) {
        $.get("https://api.myjson.com/bins/toguh", function (arr) {
             arr.push(event);
             $.ajax({
                 url: 'https://api.myjson.com/bins/toguh',
                 type: 'PUT',
                 data: JSON.stringify(arr),
                 contentType:"application/json; charset=utf-8",
                 dataType:"json",
             });
         })
    }
};
