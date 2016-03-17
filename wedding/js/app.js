//complete image count
let imageNums =0;
//all image count
const ALLIMAGE = document.querySelectorAll(".image").length;
//get client width and height
const WIDTH = window.screen.width;
const HEIGHT = window.screen.height;

//set spinner position
document.querySelector(".spinner").style.marginTop = (HEIGHT/2-30)+'px';


//set content and part div height
document.querySelector(".content").style.height = HEIGHT+'px';
[].forEach.call(document.querySelectorAll(".part"),function(dom){
	dom.style.height = HEIGHT+"px";
});

//get all image
let imgs = document.querySelectorAll(".image") || [];

//check load and complete image count
let checkImage = function(){
    imageNums++;
    if(imageNums == ALLIMAGE){
        alert("complete!")
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



