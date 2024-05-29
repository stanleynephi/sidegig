let slideIndex = 1
showSlides(slideIndex)


function plusSlides(n){
  showSlides(slideIndex += n);
}

function currentSlide(n){
  showSlides(slideIndex = n)
}

function showSlides(n){
  let i
  let slides = document.getElementsByClassName("myslides")
  if(n > slides.length){
    slideIndex = 1
  }

  if(n<1){
    slideIndex = slides.length
  }

  for(i=0; i<slides.length; i++){
    slides[i].style.display = "none"
  }
  
  slides[slideIndex-1].style.display = "block";
  // setTimeout(showSlides(n),5000)

}






window.addEventListener("scroll",reveal);

// function to activate the code
function reveal(){
    let reveal = document.querySelectorAll(".reveal");

    for(var i=0; i< reveal.length; i++){
        let windowHeight = window.innerHeight;
        let revealtop = reveal[i].getBoundingClientRect().top;
        let revealpoint = 100;

        if(revealtop < windowHeight - revealpoint){
            reveal[i].classList.add("active");
        }
        else{
            reveal[i].classList.remove("active");
        }
    }
}



// let myIndex = 0
// carousel()

// function carousel(){
//   let i

//   let  x = document.getElementsByClassName("infoms")
//   for(i=0; i<x.length; i++) {
//     x[i].style.display = "none"
//   }

//   myIndex++

//   if(myIndex > x.length){
//     myIndex=1
//   }

//   x[myIndex-1].style.display = "flex"
  
//   setTimeout(carousel,5000)
// }



const companyname = "Tranquil Minds Counseling"
const lastmodified = document.querySelector(".lastmodified")
const modifieddate = new Date(document.lastModified)
const showmodified = modifieddate.getDate()

lastmodified.innerHTML= `&copy` +" "+ `${modifieddate.getFullYear()}`+" "+`${companyname}`



//hamburger menu
const hamburger = document.querySelector("#hamburger")
const navigation = document.querySelector('.navigation');

hamburger.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamburger.classList.toggle('open');
});


// API for countries
const url = "https://restcountries.com/v3.1/all";

// Fetch API
async function getCountry() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    showCountry(data)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getCountry();


function showCountry(data){
  const selects = document.querySelectorAll("select");

  selects.forEach(select => { 
    data.forEach(country => {
      const option = document.createElement("option");
      option.value = country.name.common;
      option.textContent = country.name.common;
      select.appendChild(option);
    });
  });
}



//create an age calculator by input
let userInputs = document.querySelectorAll("#dateofbirth")
let result = document.querySelector("#age")
//prevent user from selecting future dates
userInputs.forEach(input => {
  input.max = new Date().toISOString().split("T")[0];
});

// Add event listener to each date input
userInputs.forEach(input => {
  input.addEventListener("input", function() {
      CalculateAge(input);
  });
});

// Calculate age function
function CalculateAge(input) {
  let birthdate = new Date(input.value);
  let today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  let monthDifference = today.getMonth() - birthdate.getMonth();
  let dayDifference = today.getDate() - birthdate.getDate();

  // Adjust age if the birth date hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
  }

  if(age<18){
    console.log("Too Young To Apply")
    alert("You are too young to apply")

    userInputs.forEach(
      inputs => {
        input.value = "";
      }
    )
  }
  else{
    console.log("You are old enough to apply")
  }
}


let $htmlCss = document.querySelector(".skills1 .level");
let $JavaScript = document.querySelector(".skills2 .level");
let $Python = document.querySelector(".skills3 .level");

let $htmlCssvalue = 90;
let $JavaScriptvalue = 70;
let $Pythonvalue = 65;

let $counter1 = 0;
let $counter2 = 0;
let $counter3 = 0;

let intervalId = setInterval(() => {
  if ($counter1 == $htmlCssvalue && $counter2 == $JavaScriptvalue && $counter3 == $Pythonvalue) {
    clearInterval(intervalId);
  }

  if ($counter1 < $htmlCssvalue) {
    $counter1 += 1;
    $htmlCss.innerHTML = $counter1 + "%";
    document.querySelector(".skills1").classList.remove("circle");
  } else {
    document.querySelector(".skills1").classList.add("circle");
  }

  if ($counter2 < $JavaScriptvalue) {
    $counter2 += 1;
    $JavaScript.innerHTML = $counter2 + "%";
  }

  if ($counter3 < $Pythonvalue) {
    $counter3 += 1;
    $Python.innerHTML = $counter3 + "%";
  }
}, 20);



document.querySelectorAll(".navigation a").forEach(
  link=>
    link.addEventListener("click",()=>{
      navigation.classList.remove('open');
      document.querySelector("#hamburger").checked=false

    })
)




let slidesindex = 1;
showslides(slidesindex);

function currentslide(n) {
    showslides(slidesindex = n);
}

function showslides(n) {
    let i;
    let slides = document.getElementsByClassName("infoms");

    if (n > slides.length) {
        slidesindex = 1;
    }

    if (n < 1) {
        slidesindex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slidesindex - 1].style.display = "block";
}

function plusSlides(n) {
    showslides(slidesindex += n);
}

// Automatically change slides every 2 seconds
function autoShowSlides() {
    plusSlides(1);
    setTimeout(autoShowSlides, 2000); // Adjust the interval as needed
}

autoShowSlides();






