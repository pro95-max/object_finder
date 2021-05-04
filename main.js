
status="";
objects=[];
obj_found="";


function setup(){
    document.getElementById("status").innerHTML="Objects detecting";
    canvas=createCanvas(600,400);
    canvas.position(300,300);

video=createCapture(VIDEO)
video.size(600,400);
video.hide();

}
function start(){
    objectdetector=ml5.objectDetector('cocossd',modelloaded);
    obj_found=document.getElementById("object").value;
    console.log(obj_found);
    console.log(obj_found);
}
function modelloaded(){
    console.log("cocossd is ready!");
    status=true;
   
}
function draw(){
    
    image(video,0,0,600,400);    
    r=random(255);
    g=random(255);
    b=random(255);
    
    
    if(status!=""){
       console.log(objects);
       objectdetector.detect(video,gotresults);
        for(i=0; i<objects.length; i++){
console.log(i);
if(objects[i].label==obj_found){
    
    document.getElementById("result").innerHTML=obj_found+" is "+"detected";
    utter=obj_found+" is "+"detected";
    synth = window.speechSynthesis;
    utterthis= new SpeechSynthesisUtterance(utter);
    synth.speak(utterthis);
    
    setTimeout(function(){
        synth.cancel();
    },1500);
    }
    else{
        document.getElementById("result").innerHTML=obj_found+" is "+"not "+"detected";
        utter=obj_found+" is "+"not "+"detected";
    synth = window.speechSynthesis;
    utterthis= new SpeechSynthesisUtterance(utter);
    synth.speak(utterthis);
    setTimeout(function(){
        synth.cancel();
    },1500);
    }
document.getElementById("status").innerHTML="Objects detected";
fill(r,g,b);
percent=floor(objects[i].confidence*100);
text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
noFill();
stroke(r,g,b);
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);


        }
    }
    
}
function gotresults(error,results){
    if(error){
        console.log(error);  
    }
    else{
        console.log(results);
        
        objects=results;
    }


}