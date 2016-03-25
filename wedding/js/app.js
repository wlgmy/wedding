var TouchSlide =  require('./Touch');

//complete image count
let imageNums =0;
//all image count
const ALLIMAGE = document.querySelectorAll(".image").length;
//get client width and height
const WIDTH = window.screen.width;
const HEIGHT = window.screen.height;

//set spinner position
document.querySelector(".spinner").style.marginTop = (HEIGHT/2-30)+'px';
document.querySelector(".spinner").style.marginLeft = (WIDTH/2-30)+'px';

//get all image
let imgs = document.querySelectorAll(".image") || [];

//set content and part div height

let partNum = imgs.length + 1;
document.querySelector(".content").style.height = HEIGHT +'px';
document.querySelector(".parts").style.height = HEIGHT * partNum+'px';

[].forEach.call(document.querySelectorAll(".part"),function(dom){
	dom.style.height = HEIGHT+"px";
});

//check load and complete image count
let checkImage = function(){
    imageNums++;
    if(imageNums == ALLIMAGE){
        //alert("complete!")
        document.querySelector(".shadow").style.display = 'none';
    }
};

//add compete listener in each image
for(let i = 0; i< imgs.length ;i++){
    if(imgs[i].complete){
        checkImage();
    }else{
        imgs[i].onload = checkImage;
    }

}

//BGM
document.getElementById('mc-control').addEventListener('click',function(){
    if(audio.paused){
        audio.play();
        this.className = "music_on";
    }else{
        audio.pause();
        this.className = "music_on music_off";
    }
});

TouchSlide({
    slideCell: "#touch",
    mainCell: ".content"
});




