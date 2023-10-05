/* Your Code Here */
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(employeeData => createEmployeeRecord(employeeData));
}

const createTimeInEvent = function(date){
    let yourDate = date.split(" ");
    let inTime = {
      type: "TimeIn",
      hour: parseInt(yourDate[1]),
      date: yourDate[0],
    };
  this.timeInEvents = [...this.timeInEvents, inTime];
  return this;
  }
  
  
  const createTimeOutEvent = function(date){
    let yourDate = date.split(" ");
    let outTime = {
      type: "TimeOut",
      hour: parseInt(yourDate[1]),
      date: yourDate[0],
    };
  
    this.timeOutEvents = [...this.timeOutEvents, outTime];
    return this;
  }

  const hoursWorkedOnDate = function(date) {
    for (let i = 0; i < this.timeInEvents.length; i++) {
      if (date === this.timeInEvents[i].date) {
        let arrivalTime = this.timeInEvents[i].hour;
        let departureTime = this.timeOutEvents[i].hour;
        let timeWorked = (departureTime - arrivalTime) / 100; // Convert to hours
        return timeWorked;
      }
    }
    return 0; // Returns 0 if no matching date is found
  }
  
  

  const wagesEarnedOnDate = function(date) {
    let timeWorked = hoursWorkedOnDate.call(this, date);
    return timeWorked * this.payPerHour;
  }
  

  const findEmployeeByFirstName = function(srcArray,firstName){
    let targetArr = srcArray.find((elem)=>{
    return elem.firstName === firstName;
    })
    return targetArr;
 }


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let calculatePayroll = function (arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function (memo, rec) {
        return memo + allWagesFor.call(rec);
    }, 0);
};

