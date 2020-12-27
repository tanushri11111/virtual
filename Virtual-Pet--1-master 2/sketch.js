//Create variables here
var dog,dogimg,dogimg1
var database
var foods,foodstock
function preload()
{
  //load images here
  dogimg=loadImage("images/dogImg.png")
  dogimg1=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database()
  createCanvas(500,500);
  dog=createSprite(250,300,150,150)
  dog.addImage(dogimg)
  dog.scale=0.15
  foodstock=database.ref('Food')
  foodstock.on("value",readstock)
  textSize(20)  
}


function draw() {  
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writestock(foods)
    dog.addImage(dogimg1)
  }
  if(keyWentDown(DOWN_ARROW)){
    dog.addImage(dogimg)
  }
  
  drawSprites();
  //add styles here
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foods,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}
function readstock(data){
  foods=data.val();
}

//Function to write values in DB
function writestock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}






