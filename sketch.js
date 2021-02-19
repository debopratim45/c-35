var hypnoticBall;
var database;
var position;
function setup(){
    //create the database and save it
    database=firebase.database()
    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    //point to the the position of the ball inside the database
    var hypnoticBallPosition=database.ref('ball/position')
    //add a listner,it will call read position if the position value changes,show error if any problem reading values
    hypnoticBallPosition.on("value",readPosition,showError)
}

function draw(){
    background("white");
    if(position!==undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
    
        drawSprites();
    }
   
}
//write new value of position inside the database
function writePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y,
    })

}
//read the value of position from the database
function readPosition(data){
position=data.val()
hypnoticBall.x=position.x;
hypnoticBall.y=position.y;
}
function showError(){
    console.log("error in reading values")
}