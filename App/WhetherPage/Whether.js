

async function  fetchwhether (){
    let contentdiv = document.getElementById('contentdiv')
    let cityname = document.getElementById("Cname")
    let country = document.getElementById("country")
    let temp = document.getElementById("temp")
    let icon = document.getElementById("icon")
    let whether = document.getElementById("whether")
    let wind = document.getElementById("wind")
    let sunrise = document.getElementById("sunrise")
    let sunset = document.getElementById("sunset")
    let temper = document.getElementById("temper")
    let errortag = document.getElementById("error")

    //store Api details 
    const apiKey = "5e313e218933fcf5d02f3f37c28fcc30"
    const city = document.getElementById("city").value
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    

    try{
        const response = await fetch(api)
        const matter = await response.json()
        console.log(matter)

        // variable for conver temerature into float
        let tempera = Math.floor(matter.main.temp)
        console.log(tempera)
        
        if(matter.cod === 200){
            //display the content div
             contentdiv.style.display="block"

            //create needed variables       
            let iconCode = matter.weather[0].icon
            let iconurl =  `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            cityname.innerText = ` ${matter.name}`
            temper.innerText =`${tempera}°C `
            country.innerText = `: ${matter.sys.country}`
            temp.innerText = `: ${matter.main.temp}°C 🌡️`
            icon.src=iconurl
            whether.innerText =`: ${matter.weather[0].description}`
            wind.innerText =`: ${matter.wind.speed} Km/hour 🌪️`
            sunrise.innerText=`: ${matter.sys.sunrise} 🌄`
            sunset.innerText=`: ${matter.sys.sunset} 🌄`
        }else{
            contentdiv.style.display="none"
            errortag.innerText = "City Not Found"
            console.log("Error during cod")
        }
        
    }catch(error){
        
        console.log(error.message)
    }
}