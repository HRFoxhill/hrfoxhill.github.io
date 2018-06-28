$(document).ready(function () {



    var config = {
        apiKey: "AIzaSyAy16VSsdoFHHg5HsT6ggmebBHC0n8O2Ps",
        authDomain: "trainschedule-2a04c.firebaseapp.com",
        databaseURL: "https://trainschedule-2a04c.firebaseio.com",
        projectId: "trainschedule-2a04c",
        storageBucket: "trainschedule-2a04c.appspot.com",
        messagingSenderId: "151213784436"
    };
    // initialize firebase
    firebase.initializeApp(config);

    var database = firebase.database();

    //initial variables
    var initialTrainSet = trainDefault;
    var initialDest = destDefault;
    var initialFreq = freqDefault;
    var initialArrival = arrivalDefault;
    var trainDefault = "First Train";
    var destDefault = "Anywhere";
    var freqDefault = "30";
    var arrivalDefault = "12:00 PM";
    var minutesAway = "None";

    //snapshot of the stored values in firebase, sends info on load of page

    database.ref().on("value", function (snapshot) {
        // if there is a stored value (first load)
        if (
            snapshot.child("trainDefault").exists()
            && snapshot.child("destDefault").exists()
            && snapshot.child("freqDefault").exists()
            && snapshot.child("arrivalDefault").exists()
            && snapshot.child("minutesAway").exists()
        )
{}
        else {
            trainDefault = initialTrainSet
            destDefault = initialDest
            freqDefault = initialFreq
            arrivalDefault = initialArrival
            minutesAway = minutesAway
        }
        console.log(trainDefault, destDefault, freqDefault, arrivalDefault, minutesAway);
        //change the HTML to reflect the default values
        $("Train_Name").text(trainDefault);
        $("Destination").text(destDefault);
        $("Frequency").text(freqDefault);
        $("Next_Arrival").text(arrivalDefault);
        $("Minutes_Away").text(minutesAway);

    },
        // If any errors are experienced, log them to console.
        function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });



    //  Button for adding Trains
    $("#addTrainBtn").on("click", function (event) {
        console.log("Button Clicked");
    
    event.preventDefault();

    // Grabs user input and assigns to variables
    var trainName = $("#trainNameInput").val().trim()
    var destination = $("#destinationInput").val().trim()
    var trainArrivalInput = moment($("#trainArrivalInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
    var frequencyInput = $("#frequencyInput").val().trim()
    var diffTime = moment().diff(moment.unix(trainArrivalInput), "minutes");
    var timeRemainder = diffTime % frequencyInput;
    var minutes = frequencyInput - timeRemainder;

    var nextTrainArrival = moment($()).add(minutes, "m").format("hh:mm A");
    // add new train Input Data to the Table in HTML

    var newTrain = {
        trainName: trainName,
        destination: destination,
        trainArrivalInput: frequencyInput,
        frequencyInput: nextTrainArrival,
        nextTrainArrival: minutes,
    }
    console.log(newTrain);
    // pushing data to firebase
    database.ref().push(newTrain);

    console.log("Train added Successfuly");
    })
   

    // pushing firebase info to html
    database.ref().on("child_added", function (childSnapshot) {
        console.log("SNAPSNAP",childSnapshot);

        var trainNew = childSnapshot.val().trainName
        var destNew = childSnapshot.val().destination
        var newArrival = childSnapshot.val().trainArrivalInput
        var newFreq = childSnapshot.val().frequencyInput
        var nextArrival = childSnapshot.val().nextTrainArrival

        var newRow = $("<tr>").append(
            $("<td>").text(trainNew),
            $("<td>").text(destNew),
            $("<td>").text(newArrival),
            $("<td>").text(newFreq),
            $("<td>").text(nextArrival)
        );
        
        $("#trainTable > tbody").append(newRow);
    

    //     //         // clear text-boxes
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#trainArrivalInput").val("");
        $("#frequencyInput").val("");

        //         // Prevents page from refreshing
        return false;
    });

});

