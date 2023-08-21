const fl=document.getElementById("fl");
const butt=document.getElementById("sbm");
const b1=document.getElementById("success")
const b2=document.getElementById("error1");
const b3=document.getElementById("error2");
b1.style.display="none";
b2.style.display="none";
b3.style.display="none";
sbm.addEventListener("click",function(){
    b1.style.display="none";
b2.style.display="none";
b3.style.display="none";
    event.preventDefault();
    const xl=fl.files[0];
    console.log(xl);
    const formData=new FormData();
    formData.append('xl',xl);
    fetch('/upload',{
        method: 'POST',
        body: formData,
    }).then(function(response){
        if(response.status===200){
            displayMessage();
        }else if(response.status===400){
            displayError();
        }else{
            displayFault();
        }
    })
});


fl.addEventListener("change",function(){
const task=document.getElementById("task");
b1.style.display="none";
b2.style.display="none";
b3.style.display="none";
});





function displayMessage(){
    b1.style.display="block";
}
function displayError(){
    b2.style.display="block";
}
function displayFault(){
    b3.style.display="block";
}