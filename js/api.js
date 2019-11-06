// api utl
const url = "https://environment.data.gov.uk/flood-monitoring/id/stations/0240120/readings?_sorted&_limit=100";
fetch(url).then((resp) => resp.json())
.then(function(data) {
    // stores river levels and corresponding time in two arrays
    var rvrLevels = [];
    var time = [];
    // how many recent records to recover
    const numOfRecords = 12;
    for (i = 0; i < numOfRecords; i++) {
        rvrLevels.push(data.items[i].value)
        time.push(data.items[i].dateTime)
    }

    console.log(rvrLevels);
    console.log(time);
    var dateStr = moment(time[0],'YYYY-MM-DDTHH:mm:ss')
    console.log(dateStr.fromNow())
    console.log(dateStr.format('h:mm a'))
    
    document.getElementById("currentLevel").innerHTML = "<h1 ><em> Current Level: </em>" + rvrLevels[0] + "m <em>at</em> " +dateStr.format('h:mm a')+ "</h1>"
    if (rvrLevels[0] < rvrLevels[numOfRecords-1]){
        document.getElementById("changeInLevel").innerHTML = "<img style='display:inline' src='img/down.png' height='50px' width='50px'><p style='display:inline; padding:1px;'> Falling </p>"
    }else{
        document.getElementById("changeInLevel").innerHTML = "<img id='level' src='img/up.png' height='50px' width='50px'><p> Rising</p>"
    }
})
.catch(function(error){
    console.log(error)
})

