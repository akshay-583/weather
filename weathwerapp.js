const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

//initially vairables need????

let oldTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
            
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
             
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
           
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(searchTab);
});

//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        //HW

    }

}

function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;


}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        alert("on your location")
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        //hW
    }
}

async function fetchuserweatherinfom(cordinate){
	const {lat,lon} = cordinate;
	grantaccescontainer.classList.remove("active")

	loadingscreen.classList.add("active");

	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
		);
		const data = await response.json();
		loadingscreen.classList.remove("active")
		userinfocontainer.classList.add("active")
		renderweatherinfo(data)

	} catch (error) {
		loadingscreen.classList.remove("active")
	}
}

function renderweatherinfo(){

}


function renderweatherinfo(weatherinfo){
	let cityname = document.querySelector("[data-cityname]")
	const countryicon = document.querySelector("[data-countrycon]")
	const desc = document.querySelector("[data weatweatherinfo]")
	const weathericon = document.querySelector("[data-weathericon]")
	const temp = document.querySelector("[data-temp]")
	const windspeed = document.querySelector("[wind-speed]")
	const humidity = document.querySelector("[data-humidty]")
	const cloud = document.querySelector("[data-cloud]")

     cityname.innertext =    weatherinfo?.name;
	 countryicon.src = `https://flagcdn.com/144x108/${weatherinfo?.sys?.country.toLowerCase()}.png`;
	 desc.innertext = weatherinfo?.weather[0]?.description;
	 weathericon.src = `http://openweathermap.org/img/w/${weatherinfo?.weather?.[0]?.icon}.png`;
	 temp.innerText = `${weatherinfo?.main?.temp} °C`;
	 windspeed.innerText = `${weatherinfo?.wind?.speed} m/s`;
	 humidity.innerText = `${weatherinfo?.main?.humidity}%`;
	 cloud.innerText = `${weatherinfo?.clouds?.all}%`;
 

}
function getlocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(showposition)
	}
	else{
		alert("on your device location")
	}

}
function showposition(position){
 const userCoordinates = {
	lat: position.coords.latitude,
    lon: position.coords.longitude	
 }
 sessionStorage.setItem("user-cordinate" ,JSON.stringify(userCoordinates));
fetchuserweatherinfom(userCoordinates);
}

const grantaccess = document.querySelector("[data-grantaccess]")
grantaccess.addEventListener('click',getlocation);

const searchinput = document.querySelector("[data-searchinput]")

searchform.addEventListener('submit',(e)=> {
	e.preventDefault();
	let cityName = searchinput.value;

	if(cityName=="")
	return;
else
	fetchsearchweatherinfo(cityName)

})
async function fetchsearchweatherinfo(city){

	loadingscreen.classList.add("acive");
	userinfocontainer.classList.remove("active");
	grantaccescontainer.classList.remove("active");

	try {

		const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingscreen.classList.remove("active");
        userinfocontainer.classList.add("active");
        renderweatherinfo(data);
		
	} catch (error) {
		
	}
}

	


