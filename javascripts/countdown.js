// Planned release dates
var _EX = {
   "0.3": {"y": 2013,"mo": 9,"d": 2,"h": 14,"mi": 42,"s": 0},
   "1.0": {"y": 2013,"mo": 9,"d": 22,"h": 20,"mi": 44,"s": 0},
   "2.0": {"y": 2014,"mo": 3,"d": 20,"h": 16,"mi": 57,"s": 0},
   "2.1": {"y": 2014,"mo": 6,"d": 20,"h": 12,"mi": 00,"s": 0},
   "3.0": {"y": 2014,"mo": 9,"d": 23,"h": 2,"mi": 29,"s": 0},
   "3.1": {"y": 2014,"mo": 9,"d": 23,"h": 2,"mi": 30,"s": 0},
   "3.2": {"y": 2014,"mo": 9,"d": 23,"h": 2,"mi": 31,"s": 0},
   "3.3": {"y": 2014,"mo": 10,"d": 21,"h": 2,"mi": 31,"s": 0},
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

function countdown() {
   var now = new Date();
   var currentRelease = getCurrentRelease();
   var nextRelease = getNextRelease();
   var end = getEndDate(nextRelease);
   var distance = end.getTime() / 1000 - now.getTime() / 1000;

   var cdElement = document.getElementById('countdown');
   var cdElementHTML = '<span><strong>Welcome to PerfCake!</strong></span>';
   cdElementHTML += '<span class="pull-right"><a class="btn btn-primary btn-big" href="download"><i class="icon-info-sign icon-white">&nbsp;Version ' + currentRelease + ' is out &raquo;</i></a></span>';
   cdElementHTML += '<div style="clear: both;" /><br/><br/>';
   cdElementHTML += '<div style="display: inline-block; white-space: nowrap;">Time to release ' + nextRelease + ':<div class="countdown-clock" /></div>';

   cdElement.innerHTML = cdElementHTML;
   clock = $('.countdown-clock').FlipClock(distance, {
      clockFace: 'DailyCounter',
      excludeDots: true,
      countdown: true
   });
}
