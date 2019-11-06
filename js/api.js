// api utl
const url = "https://environment.data.gov.uk/flood-monitoring/id/stations/0240120/readings?_sorted&_limit=100";
fetch(url).then((resp) => resp.json())
.then(function(data) {
    // stores river levels and corresponding time in two arrays
    var rvrLevels = [];
    var time = [];
    // how many recent records to recover
    const numOfRecords = 12;
    var dateStr;
    for (i = 0; i < numOfRecords; i++) {
        rvrLevels.push(data.items[i].value)
        dateStr = moment(data.items[i].dateTime,'YYYY-MM-DDTHH:mm:ss')
        time.push(dateStr.format('h:mma'))
    }

    // saves most recent time as moment object (easy to format)

 
    // current level is displayed with time formatted
    document.getElementById("currentLevel").innerHTML = "<h1 ><em> Current Level: </em>" + rvrLevels[0] + "m <em>at</em> " +time[0]+ "</h1>"
    // if levels are rising or falling
    if (rvrLevels[0] < rvrLevels[numOfRecords-1]){
        document.getElementById("changeInLevel").innerHTML = "<img style='display:inline' src='img/down.png' height='50px' width='50px'><p style='display:inline; padding:1px;'> Falling </p>"
    }else{
        document.getElementById("changeInLevel").innerHTML = "<img style='display:inline' src='img/up.png' height='50px' width='50px'><p style='display:inline; padding:1px;'> Rising </p>"
    };

    // the set limits for each class
    const topLevel = 0.65;
    const intLevel = 0.62;
    const novLevel = 0.6;
    
    
    // if level higher than each crew limit
    if (rvrLevels[0] > topLevel){
        document.getElementById("topCrews").innerHTML += "<button style='display:inline;' type='button' class='btn btn-danger'>Not Suitable</button>"
    }else{
        document.getElementById("topCrews").innerHTML += "<button type='button' class='btn btn-success'>Suitable</button>"
    }

    if (rvrLevels[0] > intLevel){
        document.getElementById("intCrews").innerHTML += "<button style='display:inline;' type='button' class='btn btn-danger'>Not Suitable</button>"
    }else{
        document.getElementById("intCrews").innerHTML += "<button type='button' class='btn btn-success'>Suitable</button>"
    }

    if (rvrLevels[0] > novLevel){
        document.getElementById("novCrews").innerHTML += "<button style='display:inline;' type='button' class='btn btn-danger'>Not Suitable</button>"
    }else{
        document.getElementById("novCrews").innerHTML += "<button type='button' class='btn btn-success'>Suitable</button>"
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: time.reverse(),
        datasets: [{
            label: 'River Level (m)',
            backgroundColor: 'rgb(3, 152, 252)',
            borderColor: 'rgb(255, 255, 255)',
            data: rvrLevels.reverse()
        }]
    },

    // Configuration options go here
    options: { 
        legend: {
            labels: {
                fontColor: "white",
                fontSize: 18
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",
                    fontSize: 18,
                    stepSize: 0.1,
                    
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white",
                    fontSize: 14,
                    stepSize: 1,
                    beginAtZero: false
                }
            }]
        }
    }
});
})
.catch(function(error){
    console.log(error)
})

