let currDate = new Date();

let curr_month = {value: currDate.getMonth()};
let curr_year = {value: currDate.getFullYear()};
let calendar = document.querySelector('.calendar');

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const year_names = [];

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0);
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days');
    let calendar_header_year = calendar.querySelector('#year');

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    calendar_days.innerHTML = '';

    let currDate = new Date();
    // if (!month) month = currDate.getMonth()
    // if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`;
    month_picker.innerHTML = curr_month;
    calendar_header_year.innerHTML = year;

    // get first day of month

    let first_day = new Date(year, month, 1);

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div');
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover');
            day.innerHTML = i - first_day.getDay() + 1;
            day.innerHTML += `<span></span><span></span><span></span><span></span>`;
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date');
            }
        }
        calendar_days.appendChild(day);
    }
}

let month_list = calendar.querySelector('.month-list');

let genrateMonthList = () =>{
    let month;
    month_list.innerHTML = '';
    month = document.createElement('DIV');
    month.style.cssText = 'grid-column: 1 / 4;cursor: pointer; font-weight: 600; color: var(--color-txt)';

	month.innerHTML = '<span class="month-change" id="exit-month"><pre>&#x292B;</pre></span>';
    month_list.appendChild(month);
	month.onclick = () =>{
		month_list.classList.remove('show');
		month_list.classList.add('exit');
	}
    month_names.forEach((e, index) => {
        let month = document.createElement('div');
        month.innerHTML = `<div data-month="${index}">${e}</div>`;
        month.querySelector('div').onclick = () => {
            month_list.classList.remove('show');
            curr_month.value = index;
            generateCalendar(index, curr_year.value);
        };
        month_list.appendChild(month);
    });
}

let year_list = calendar.querySelector('.year-list');

let genrateYearList = (value) => {
	let year;
	year_list.innerHTML = "";
	year = document.createElement('div');
    year.innerHTML = '<span class="year-change" id="prev-year" style="font-weight: 600"><pre>&lt;</pre></span>';
    year.onclick = () =>{
        genrateYearList(parseInt(document.querySelector('.year-list').childNodes[document.querySelector('.year-list').childNodes.length-1].childNodes[0].innerText)-18);
    }
	year_list.appendChild(year);
	year = document.createElement('div');
    year.innerHTML = '<span class="year-change" id="exit-year" style="font-weight: 600"><pre>&#x292B;</pre></span>';
	year_list.appendChild(year);
	year.onclick = () =>{
		year_list.classList.remove('show');
		year_list.classList.add('exit');
	}
	year = document.createElement('div');
    year.innerHTML = '<span class="year-change" id="next-year" style="font-weight: 600"><pre>&gt;</pre></span>';
    year.onclick = () =>{
        genrateYearList(parseInt(document.querySelector('.year-list').childNodes[document.querySelector('.year-list').childNodes.length-1].childNodes[0].innerText)+6);
    }
	year_list.appendChild(year);
	for(var i=5;i>=0;i--)
	{
		year = document.createElement('div');
        year.innerHTML = `<div data-year="${value-i}">${value-i}</div>`;
        year.onclick = (e) =>{
            curr_year.value = parseInt(e.target.innerText);
            generateCalendar(month_names.indexOf(document.querySelector('.month-picker').innerText),parseInt(e.target.innerText));
            year_list.classList.remove('show');
            year_list.classList.add('exit');
        }
		year_list.appendChild(year);
	}
	for(var i=1;i<7;i++)
	{
		year = document.createElement('div');
        year.innerHTML = `<div data-year="${value+i}">${value+i}</div>`;
        year.onclick = (e) =>{
            curr_year.value = parseInt(e.target.innerText);
            generateCalendar(month_names.indexOf(document.querySelector('.month-picker').innerText),parseInt(e.target.innerText));
            year_list.classList.remove('show');
            year_list.classList.add('exit');
        }
		year_list.appendChild(year);
	}

	year_list.classList.add('show');
	year_list.classList.remove('exit');
}

let month_picker = calendar.querySelector('#month-picker');
let year_picker = calendar.querySelector('#year');

month_picker.onclick = () => {
    genrateMonthList()
    month_list.classList.add('show');
    month_list.classList.remove('exit');
}

year_picker.onclick = () => {
	genrateYearList(parseInt(calendar.querySelector('#year').innerHTML));
}



generateCalendar(curr_month.value, curr_year.value);

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value;
    generateCalendar(curr_month.value, curr_year.value);
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value;
    generateCalendar(curr_month.value, curr_year.value);
}

let dark_mode_toggle = document.querySelector('.dark-mode-switch');

dark_mode_toggle.onclick = () => {
    document.querySelector('body').classList.toggle('light');
    document.querySelector('body').classList.toggle('dark');
}

//get Time

var getTime = setInterval(function() {

    var now = new Date();

    var hours =now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var AP;

    if(hours%12!==0)
    {
        AP = 12>hours;
        hours = hours % 12;
    }
    else
    {
        AP=hours/12==2;
        hours= AP?0:12;
    }

    if(10>hours)
        hours="0"+hours;
    if(10>minutes)
        minutes="0"+minutes;
    if(10>seconds)
        seconds="0"+seconds;

    document.getElementById("hours").innerHTML = hours + " : ";
    document.getElementById("mins").innerHTML =  minutes + " : ";
    document.getElementById("secs").innerHTML = seconds+" ";
    if(AP)
        document.getElementById("ap").innerHTML = "AM";
    else
        document.getElementById("ap").innerHTML = "PM";
}, 1000);