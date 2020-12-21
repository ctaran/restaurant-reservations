export function currentDateFormatted(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    var sp = "-"

    if (dd<10) dd='0'+dd;
    if (mm<10) mm='0'+mm;
    
    return (yyyy+sp+mm+sp+dd);
}

export function getDateFormatted(datetimeString) {
    var datetime = new Date(datetimeString);
    var dd = datetime.getDate();
    var mm = datetime.getMonth()+1; //As January is 0.
    var yyyy = datetime.getFullYear();
    var sp = "-"

    if (dd<10) dd='0'+dd;
    if (mm<10) mm='0'+mm;
    
    return (yyyy+sp+mm+sp+dd);
}

export function getTimeFormatted(datetimeString) {
    var datetime = new Date(datetimeString);
    var HH = datetime.getHours();
    var time_sp = ":"

    return (HH+time_sp+"00");
}