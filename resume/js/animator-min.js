function StopWatch(){this.startTime=0,this.running=!1,this.pause=!1,this.startPauseTime=0,this.totalPauseTime=0,this.elapsed=0}function AnimationTimer(a,b){this.duration=a||1e3,this.transducer=b,this.stopWatch=new StopWatch}StopWatch.prototype={start:function(){this.startTime=+new Date,this.running=!0,this.startPauseTime=0,this.totalPauseTime=0},stop:function(){this.pause&&this.unpause(),this.elapsed=+new Date-this.startTime-this.totalPauseTime,this.running=!1},pause:function(){this.pause||(this.startPauseTime=+new Date,this.pause=!1)},unpause:function(){this.pause&&(this.totalPauseTime=+new Date-this.startPauseTime,this.startPauseTime=0,this.pause=!1)},isRunning:function(){return this.running},isPause:function(){return this.pause},getElapsedTime:function(){return this.running?+new Date-this.startTime-this.totalPauseTime:this.elapsed},reset:function(){this.startTime=0,this.running=!1,this.pause=!1,this.startPauseTime=0,this.totalPauseTime=0,this.elapsed=0}},AnimationTimer.prototype={start:function(){this.stopWatch.start()},stop:function(){this.stopWatch.stop()},pause:function(){this.stopWatch.pause()},unpause:function(){this.stopWatch.unpause()},isRunning:function(){return this.stopWatch.isRunning()},isPause:function(){return this.stopWatch.isPause()},reset:function(){this.stopWatch.reset()},isExpired:function(){return this.stopWatch.getElapsedTime()>this.duration},getRealElapsedTime:function(){return this.stopWatch.getElapsedTime()},getElapsedTime:function(){var a=this.stopWatch.getElapsedTime(),b=a/this.duration;return b>=1&&(b=1),this.transducer&&b>0&&(a*=this.transducer(b)/b),a}},AnimationTimer.makeEaseOutTransducer=function(a){return function(b){return a=a?a:1,1-Math.pow(1-b,2*a)}},AnimationTimer.makeEaseInTransducer=function(a){return a=a?a:1,function(b){return Math.pow(b,2*a)}},AnimationTimer.makeEaseInOutTransducer=function(){return function(a){return a-Math.sin(2*a*Math.PI)/(2*Math.PI)}},AnimationTimer.makeElasticTransducer=function(a){return a=a||3,function(b){return(1-Math.cos(b*Math.PI*a))*(1-b)+b}},AnimationTimer.makeBounceTransducer=function(a){var b=AnimationTimer.makeElasticTransducer(a);return a=a||2,function(a){return a=b(a),1>=a?a:2-a}},AnimationTimer.makeLinearTransducer=function(){return function(a){return a}};