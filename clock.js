var clockTarget = document.getElementById("clock");


function clock() {
    const startdate_1 = new Date(2021, 9, 15, 18, 45, 0);
    const startdate_2 = new Date(2021, 9, 31, 23, 25, 0);
    const currentdate = new Date()
    var date = currentdate.getTime() - startdate_1.getTime();
    var date_2 = currentdate.getTime() - startdate_2.getTime();


    var seconds =  Math.abs(parseInt(date / 1000 % 60));
    var minutes = Math.abs(parseInt(date / 1000 / 60 % 60));
    var hours = Math.abs(parseInt(date / 1000 / 60 / 60 % 24));
    var day = Math.abs(parseInt(date / 1000 / 60 / 60 / 24));
    var seconds_2 =  Math.abs(parseInt(date_2 / 1000 % 60));
    var minutes_2 = Math.abs(parseInt(date_2 / 1000 / 60 % 60));
    var hours_2 = Math.abs(parseInt(date_2 / 1000 / 60 / 60 % 24));
    var day_2 = Math.abs(parseInt(date_2 / 1000 / 60 / 60 / 24));

    clockTarget .innerText = `${day}일 ${hours}시간 ${minutes}분 ${seconds}초     ${day_2}일 ${hours_2}시간 ${minutes_2}분 ${seconds_2}초`;
}



function init() {
clock();
setInterval(clock, 1000);
}

init();