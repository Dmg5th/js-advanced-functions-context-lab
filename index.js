function createEmployeeRecord(array){
    let newArr = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newArr;
}

function createEmployeeRecords(array){
    return array.map(nameObj => createEmployeeRecord(nameObj))
}

function createTimeInEvent(dateStamp){
    let [date, time] = dateStamp.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    })

    return this
}

function createTimeOutEvent(dateStamp){
    let [date, time] = dateStamp.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(time, 10)
    })
    return this
}

function hoursWorkedOnDate(dateStamp){
    let inDate = this.timeInEvents.find(e => e.date === dateStamp)

    let outDate = this.timeOutEvents.find(e => e.date === dateStamp)

    return (outDate.hour - inDate.hour) / 100;

}

function wagesEarnedOnDate(date){
   return hoursWorkedOnDate.call(this, date) * this.payPerHour
    
}


let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(name => name.firstName === firstName)
}

function calculatePayroll(employees) {
    const reducer = (total, currentEmployee) => total + allWagesFor.call(currentEmployee);
    return employees.reduce(reducer, 0)
}
