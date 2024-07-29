//https://teachablemachine.withgoogle.com/models/aFWC5BAlg/

Webcam.set({
    width: 300,
    height:300,
    image_format:"png",
    png_quality:90
})

Webcam.attach("#web_cam");

function capture_pic(){
    Webcam.snap(function(image_uri){
        document.getElementById("out_put").innerHTML="<img id='pic' src='"+image_uri+"'>";
        

    });
}   

console.log("ml5 version",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/aFWC5BAlg/model.json",modelLoaded);

function modelLoaded(){
console.log("Model Loaded");
}

function identify_pic(){
    cap = document.getElementById("pic");
    //to find out which family member it is
    classifier.classify(cap,got_results);
}

function got_results (error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results);
        //in the console the first option for what the member might be is 0 so "results[0].label" means its grabbing the member name 
        document.getElementById("result_member_name").innerHTML=results[0].label;
        //.confidence is used to order the items with the highest percentage to the lowest and we are multiplying by 100 because it is a very long decimal and using .toFixed to shoreten the decimal to 2 places
        accuracy =(results[0].confidence * 100).toFixed(2);
        //accuracy +"%" is adding a pecentage sighn to the end of the accuracy number
        document.getElementById("result_accuracy_percentage").innerHTML = accuracy + "%";
    }
}