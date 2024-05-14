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


