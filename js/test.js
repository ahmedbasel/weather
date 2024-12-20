
var searchinput=document.getElementById('searchinput');
var data=document.getElementById('data');
var data2=document.getElementById('data2');
var data3=document.getElementById('data3');

var locdata=[];
var castdata=[];
var currentdata=[];


var weather={
    
}




window.onload = function () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          getdata(`${lat},${lon}`); 
        },
        (error) => {
          console.warn("User denied location access or an error occurred.");
          getdata("Cairo"); 
        }
      );
    } else {
      console.warn("Geolocation is not supported by your browser.");
      getdata("Cairo"); 
    }
  };


searchinput.addEventListener('keyup',function(city){
getdata(city.target.value);
})


async function getdata(klma){
       
 
    var res= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=762827a3218343219bb232924241612&q=${klma}&days=3`)
    var data= await res.json()
   
    locdata=data.location;
    castdata=data.forecast.forecastday;
    currentdata=data.current;
    console.log(locdata);
    console.log(castdata);
    console.log(currentdata);
    // console.log(data);

    showdata()
}

function showdata(){
    var str='';

    // temp_c


    var day1date=new Date(castdata[0].date);
    var day1name=day1date.toLocaleDateString('en-US', { weekday: 'long' }); 
    str=`


    <div class="d-flex justify-content-between">
    <span>${day1name}</span>
    <span>${castdata[0].date}</span>
    
    </div>
    <p class="fs-4 text-center" >${locdata.name}</p>

    </div>
    <div class="num fs-1 text-center">${currentdata.temp_c}<sup>o</sup>C</div>

  <div class="text-center">
  <span >${currentdata.condition.text}</span>
  </div>
   
    <div class="forecast-icon text-center">
    <img src="https:${currentdata.condition.icon}" alt="" width="90">
    </div>

    <div class="text-center">
    
        <span class="me-4"><img class="me-1" src="img/icon-umberella@2x.png" width="25">20%</span>
        <span class="me-4"><img class="me-1" src="img/icon-wind@2x.png" width="25">18km/h</span>
        <span class="me-4"><img class="me-1"  src="img/icon-compass@2x.png" width="25">East</span>
    </div>
    
    </div>

  
    
    `
    
    var day2date=new Date(castdata[1].date);
    var day2name=day2date.toLocaleDateString('en-US', { weekday: 'long' }); 
    
    var str2=`

    <div class="text-center">
    <span>${day2name}</span>
   
    <div class="forecast-icon text-center py-5">
    <img src="https:${castdata[1].day.condition.icon}" alt="" width="70">
    <div class="num fs-1 text-center">${castdata[1].day.maxtemp_c}<sup>o</sup>C</div>
     <span>${castdata[1].day.mintemp_c}</span>
    <p>${castdata[1].day.condition.text}</p>
    </div>
    
    </div>
    `
        
    var day3date=new Date(castdata[2].date);
    var day3name=day3date.toLocaleDateString('en-US', { weekday: 'long' }); 
    
    var str3=`
    <div class="text-center">
    <span>${day3name}</span>
   
    <div class="forecast-icon text-center py-5">
    <img src="https:${castdata[2].day.condition.icon}" alt="" width="70">
    <div class="num fs-1 text-center">${castdata[2].day.maxtemp_c}<sup>o</sup>C</div>
     <span>${castdata[2].day.mintemp_c}</span>
    <p>${castdata[2].day.condition.text}</p>
    </div>
    
    </div>
    
    `
    data.innerHTML=str;
    data2.innerHTML=str2;
    data3.innerHTML=str3;
}