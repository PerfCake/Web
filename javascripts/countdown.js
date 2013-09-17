// Planned release dates
var _EX = {
   "0.3": {"y": 2013,"mo": 9,"d": 2,"h": 14,"mi": 42,"s": 0},
   "1.0": {"y": 2013,"mo": 9,"d": 22,"h": 20,"mi": 44,"s": 0},
   "2.0": {"y": 2014,"mo": 3,"d": 20,"h": 16,"mi": 57,"s": 0},
   "3.0": {"y": 2014,"mo": 9,"d": 23,"h": 2,"mi": 29,"s": 0},
   "4.0": {"y": 2015,"mo": 3,"d": 20,"h": 22,"mi": 45,"s": 0},
   "5.0": {"y": 2015,"mo": 9,"d": 23,"h": 8,"mi": 21,"s": 0},
   "6.0": {"y": 2016,"mo": 3,"d": 20,"h": 4,"mi": 30,"s": 0},
   "7.0": {"y": 2016,"mo": 9,"d": 22,"h": 14,"mi": 21,"s": 0},
   "8.0": {"y": 2017,"mo": 3,"d": 20,"h": 10,"mi": 29,"s": 0},
   "9.0": {"y": 2017,"mo": 9,"d": 22,"h": 20,"mi": 2,"s": 0},
   "10.0": {"y": 2018,"mo": 3,"d": 20,"h": 16,"mi": 15,"s": 0},
   "11.0": {"y": 2018,"mo": 9,"d": 23,"h": 1,"mi": 54,"s": 0},
   "12.0": {"y": 2019,"mo": 3,"d": 20,"h": 21,"mi": 58,"s": 0},
   "13.0": {"y": 2019,"mo": 9,"d": 23,"h": 7,"mi": 50,"s": 0}
}

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;

function getEndDate(_ver){
   var end = new Date();
   end.setUTCFullYear(_EX[_ver].y);
   end.setUTCMonth(_EX[_ver].mo - 1);
   end.setUTCDate(_EX[_ver].d);
   end.setUTCHours(_EX[_ver].h);
   end.setUTCMinutes(_EX[_ver].mi);
   end.setUTCSeconds(_EX[_ver].s);
   return end;
}

function getNextRelease(){
   var now = new Date();
   for(_ver in _EX){
      end = getEndDate(_ver);
      if(end-now < 0){
         continue;
      } else {
         return _ver;
      }
   }
}

function getCurrentRelease(){
   var now = new Date();
   var last = null;
   for(_ver in _EX){
      end = getEndDate(_ver);
      if(end-now < 0){
         last = _ver;
         continue;
      } else {
         return last;
      }
   }
}

function showRemaining() {
   var now = new Date();
   var currentRelease = getCurrentRelease();
   var nextRelease = getNextRelease();
   var end = getEndDate(nextRelease);
   var distance = end - now;

   var days = Math.floor(distance / _day);
   var hours = Math.floor((distance % _day) / _hour);
   var minutes = Math.floor((distance % _hour) / _minute);
   var seconds = Math.floor((distance % _minute) / _second);

   var cdElement = document.getElementById('countdown');
   cdElement.innerHTML = '<h2>Version ' + currentRelease + ' is out!</h2>';
   cdElement.innerHTML += 'The next release ' + nextRelease + ' will be unleashed in:<br/>';
   cdElement.innerHTML += '<span style="font-size: 2em;">' + (days < 100 ? (days < 10 ? '00' : '0') : '') + days + '&nbsp;</span>DAYS&nbsp;&nbsp;';
   cdElement.innerHTML += '<span style="font-size: 2em;">' + (hours < 10 ? '0' : '') + hours + '</span>&nbsp;HRS&nbsp;&nbsp;';
   cdElement.innerHTML += '<span style="font-size: 2em;">' + (minutes < 10 ? '0' : '') + minutes + '</span>&nbsp;MINS&nbsp;&nbsp;';
   cdElement.innerHTML += '<span style="font-size: 2em;">' + (seconds < 10 ? '0' : '') + seconds + '</span>&nbsp;SECS';
}
timer = setInterval(showRemaining, 1000);