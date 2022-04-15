

// obtaining date and time using Moment.js
var currentDate = moment().format('dddd') + " , " + moment().format("MMMM Do");
var currentHour = moment().format('h A');
var currentHourMin = moment().format('h:mm A');

//global scope variables inizilization
var workHours = 12;
var currentDay = $('#current-day')
var currentTime = $('#current-time')
var container = $('.container')
var text = $('#text')
var currentArray = currentHour.split("")
var timeFrame = ""
var currentTimeFrame = ""
var currentNumber = ""
var existingTask = []

//adding to the header in the page the current date and time
currentDay.text(currentDate)
currentTime.text(currentHourMin)

//calling a function to the current timeframe and hour 
getHour(currentArray.length, currentArray)
currentTimeFrame = timeFrame
currentNumber = parseInt(numberHour)

//if there is as task previously saved in local storage is saved in a variable
if (JSON.parse(localStorage.getItem("existingTask")) !== null) {
  var existingTask = JSON.parse(localStorage.getItem("existingTask"))
}
//for loop over each block of time to compare with the current time 
for (let i = 0; i < 12; i++) {
  var currentTask = []
  var blockTimeFrame = ""
  var lastTaskHour = []
  var blockArray = container.children().children('div').eq(i).text().trim().split("")
  var timeLine = container.children('div').eq(i)
  var saveBtn = container.children().children('button').eq(i)

  //calling a function to the current timeframe and hour of each block of time
  getHour(blockArray.length, blockArray)
  blockTimeFrame = timeFrame
  numberBlock = parseInt(numberHour)

  /*calling a function that assigns a different background colour depeding on the block of time 
  being past, present or future.*/
  checkColorBlock()

  /*for loop to get all the saved tasks and show them in their block
   of time even after the page is refreshed*/
  for (var j = 0; j < existingTask.length; j++) {
    var existingTaskArray = existingTask[j].hour.split("")
    getHour(existingTaskArray.length, existingTaskArray)
    lastTaskHour[j] = parseInt(numberHour)
    if (lastTaskHour[j] === numberBlock) {
      container.children().children('textarea').eq(i).text(existingTask[j].task)
    }
  }

  /*adding event listener click. When click in the save icon the written task is saved
  in loca storage*/
  saveBtn.on('click', saveData)
  function saveData(event) {
    event.preventDefault()
    currentTask = {
      task: container.children().children('textarea').eq(i).val(),
      hour: container.children().children('div').eq(i).text(),
    };
    if (currentTask.task !== null) {
      existingTask.push(currentTask)
      localStorage.setItem("existingTask", JSON.stringify(existingTask))
    }
  }
}

/*this function assigns a diffent colour background to the time block, depending 
on the time block being past, present or future*/
function checkColorBlock() {
  if (currentTimeFrame === blockTimeFrame) {
    if (numberBlock === currentNumber) {
      timeLine.addClass('present')
    }
    if (numberBlock > currentNumber) {
      if (numberBlock === 12) {
        timeLine.addClass('past')
      } else {
        timeLine.addClass('future')
      }
    }
    if (numberBlock < currentNumber) {
      if (currentNumber === 12) {
        timeLine.addClass('future')
      } else { timeLine.addClass('past') }
    }
  }
  if ((currentTimeFrame === "AM") && (blockTimeFrame === "PM")) {
    ttimeLine.addClass('future')
  }
  if ((currentTimeFrame === "PM") && (blockTimeFrame === "AM")) {
    timeLine.addClass('past')
  }
}

//this function gets the time and the timeframe of the day
function getHour(arrayLength, array) {
  if (arrayLength === 4) {
    timeFrame = array[2] + array[3]
    numberHour = array[0]
  }
  if (arrayLength === 5) {
    timeFrame = array[3] + array[4]
    numberHour = array[0] + array[1]
  }
}

