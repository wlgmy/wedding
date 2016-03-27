"use strict";

//import {TouchSlide} from './Touch';
//var TouchSlide = require('./Touch');

//complete image count
var imageNums = 0;
//all image count

var ALLIMAGE = document.querySelectorAll(".image").length;
//get client width and height
var WIDTH = window.screen.width;
var HEIGHT = window.screen.height;

//set spinner position
document.querySelector(".spinner").style.marginTop = HEIGHT / 2 - 30 + 'px';
document.querySelector(".spinner").style.marginLeft = WIDTH / 2 - 30 + 'px';

//get all image
var imgs = document.querySelectorAll(".image") || [];

//set content and part div height

var partNum = imgs.length + 1;
document.querySelector(".content").style.height = HEIGHT + 'px';
document.querySelector(".parts").style.height = HEIGHT * partNum + 'px';

[].forEach.call(document.querySelectorAll(".part"), function (dom) {
    dom.style.height = HEIGHT + "px";
});

//check load and complete image count
var checkImage = function checkImage() {
    imageNums++;
    if (imageNums == ALLIMAGE) {
        //alert("complete!")
        document.querySelector(".shadow").style.display = 'none';
    }
};

//add compete listener in each image
for (var i = 0; i < imgs.length; i++) {
    if (imgs[i].complete) {
        checkImage();
    } else {
        imgs[i].onload = checkImage;
    }
}

//BGM
document.getElementById('mc-control').addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        this.className = "music_on";
    } else {
        audio.pause();
        this.className = "music_on music_off";
    }
});

TouchSlide({
    slideCell: "#touch",
    mainCell: ".content"
});