/*
Touch.js
实现上下滚动效果
*/

var TouchSlide = function(a){
    a = a || {};
    var opts = {
        slideCell: a.slideCell || "#touchSlide",
        mainCell: a.mainCell || ".mainCell",
        delayTime: a.delayTime || 200,
    };

    var slideCell = document.getElementById(opts.slideCell.replace("#",""));
    if(!slideCell){
        return false;
    }
    var mainCell = document.querySelector(opts.mainCell);
    if(!mainCell){
        return false;
    }

    var mainCellHeight = Number(mainCell.style.height.replace("px","")) || 0;
    var slideCellHeight = Number(slideCell.style.height.replace("px","")) || 0;

    //全局对象
    var startY = 0;
    var distY = 0;
    var endY = 0;
    var scrollY = 0;
    var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion);
    var hasTouch = 'ontouchstart' in window && !isTouchPad;
    //TODO
    //hasTouch = false;

    var touchStart = hasTouch ? 'touchstart' : 'mousedown';
    var touchMove = hasTouch ? 'touchmove' : 'mousemove';
    //var touchMove = hasTouch ? 'touchmove' : '';
    var touchEnd = hasTouch ? 'touchend' : 'mouseup';

    //
    var move = function(){

    };

    //Touch move func
    var tMove = function(e){
        if( hasTouch ){ if ( e.touches.length > 1 || e.scale && e.scale !== 1) return } //多点或缩放

        var point = hasTouch ? e.targetTouches[0] : e;
        distY = point.pageY-startY;
    };

    //Touch end func
    var tEnd = function(e){
        if(distY==0) return;
        e.preventDefault();
        console.log("maincell",mainCellHeight);
        console.log("slideCell",scrollHeight);

        console.log("touch end",distY);

        mainCell.removeEventListener(touchMove, tMove, false);
        mainCell.removeEventListener(touchEnd, tEnd, false);

        var scrollHeight;
        var scrollTop = mainCell.scrollTop;
        console.log("scrollTop",scrollTop);
        var scrollDis = scrollTop - scrollY;

        console.log("scrollDis",scrollDis);

        //console.log("restSrocll",restScroll);
        if(distY < 0){
            if(scrollTop >= slideCellHeight){
                scrollHeight = scrollTop - slideCellHeight;
            }else{
                scrollHeight = scrollDis - mainCellHeight;
            }
        }else{
            if(scrollTop <= 0){
                scrollHeight = 0 - scrollTop;
            }else{
                scrollHeight = mainCellHeight + scrollDis;
            }
        }
        //console.log("scrollY",scrollTop - scrollY);
        console.log("scrollheigt",scrollHeight);

        slideCell.style.webkitTransform = "translate(0px," + scrollHeight +"px)";
        slideCell.style.mozTransform = "translate(0px," + scrollHeight +"px)";
        //slideCell.stye.oTransform = "translate(0px," + scrollHeight +"px)";
        slideCell.style.transform = "translate(0px," + scrollHeight +"px)";
    };

    //Touch start func
    var tStart = function(e){
        distY = 0;
        var point = hasTouch ? e.targetTouches[0] : e;
        startY = point.pageY;
        scrollY = mainCell.scrollTop;

        console.log("touch start");

        //add touch move listener
        mainCell.addEventListener(touchMove,tMove,false);
        //add touch end listener
        mainCell.addEventListener(touchEnd,tEnd,false);
    };

    //add touchStart listener
    console.log(mainCell);
    mainCell.addEventListener(touchStart,tStart,false);
};

//export default TouchSlide;