window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        document.querySelector("#topButton").style.display = "block";
    }
    else{
        document.querySelector("#topButton").style.display = "none";
    }
}

function topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function showPassword(){
    if(document.querySelector("#prof_pass_input").type == "password"){
        document.querySelector("#prof_pass_input").type = "text";
    }
    else{
        document.querySelector("#prof_pass_input").type = "password";
    }
}
window.onscroll = function() {
    var navbar = document.querySelector("nav");
    var scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    } else {
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    }
};