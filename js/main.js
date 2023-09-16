const template = document.querySelector(".template").content;
const form = document.querySelector(".form");
const list = document.querySelector(".site__list-render")
const select = document.querySelector(".select");
const city = document.querySelector(".header__bottom-cityname");
const haftalik = document.querySelector(".haftalik");
const kunlik = document.querySelector(".kunlik");
const table = document.querySelector(".table");
const tableBody = document.querySelector(".table__body");




const fragment = document.createDocumentFragment();
function renderFunction(arr) {
    list.innerHTML = ""
    arr.forEach(item => {
        const firstClone = template.cloneNode(true);
        firstClone.querySelector(".time__bomdod").textContent = `${item.times.tong_saharlik}`
        firstClone.querySelector(".time__quyosh").textContent = `${item.times.quyosh}`
        firstClone.querySelector(".time__peshin").textContent = `${item.times.peshin}`
        firstClone.querySelector(".time__asr").textContent = `${item.times.asr}`
        firstClone.querySelector(".time__shom").textContent = `${item.times.shom_iftor}`
        firstClone.querySelector(".time__xufton").textContent = `${item.times.hufton}`;
        city.textContent = item.region;
        
            const date = new Date();
            const hours = date.getHours();
            const minute = date.getMinutes();
            // console.log(item.times.tong_saharlik.slice(3,5))
            if (hours => item.times.tong_saharlik.slice(0, 2) && minute >= item.times.tong_saharlik.slice(3, 5)) {
                firstClone.querySelector(".site-item__in--one").classList.add("border")
            }
            else if (hours >= Number(item.times.tong_saharlik.slice(0, 2)) && hours <= Number(item.times.quyosh.slice(0, 2))
                && minute < item.times.quyosh.slice(3, 5)
            ) {
                firstClone.querySelector(".site-item__in--one").classList.add("border")
            }
            else if (hours >= Number(item.times.quyosh.slice(0, 2)) && hours <= Number(item.times.peshin.slice(0, 2))
                && minute < item.times.peshin.slice(3, 5)
            ) {

                firstClone.querySelector(".site-item__in--twoo").classList.add("border")
            }
            else if (hours >= Number(item.times.peshin.slice(0, 2)) && hours <= Number(item.times.asr.slice(0, 2))
                && minute < item.times.asr.slice(3, 5)) {

                firstClone.querySelector(".site-item__in--three").classList.add("border")
            }
            else if (hours >= Number(item.times.asr.slice(0, 2)) && hours <= Number(item.times.shom_iftor.slice(0, 2))
                && minute < item.times.shom_iftor.slice(3, 5)
            ) {

                firstClone.querySelector(".site-item__in--four").classList.add("border")
            }
            else if (hours >= Number(item.times.shom_iftor.slice(0, 2)) && hours < Number(item.times.hufton.slice(0, 2))
                && minute < item.times.hufton.slice(3, 5)
            ) {
                firstClone.querySelector(".site-item__in--five").classList.add("border")
            }
            else if (hours >= Number(item.times.hufton.slice(0, 2)) || hours <= item.times.tong_saharlik.slice(0, 2) && minute < item.times.tong_saharlik.slice(3, 5)) {
                firstClone.querySelector(".site-item__in--six").classList.add("border")
            }
                
        
        

        // dateFunction()
        /*    minut boyicha ham tekshirish kerak */
        fragment.appendChild(firstClone);
        
    });
    list.appendChild(fragment);
}
const regionArr = JSON.parse(localStorage.getItem("regionArr") || "[]");
localStorage.setItem("regionArr", JSON.stringify(regionArr));
renderFunction(regionArr)
async function getCity(url) {
    try {
        const respons = await fetch(url);
        const data = await respons.json();
        const result = data;
        regionArr.push(result);
        localStorage.setItem("regionArr", JSON.stringify(regionArr));
        renderFunction(regionArr)
        if (regionArr.length > 1) {
            regionArr.splice(result, 1);
            localStorage.setItem("regionArr", JSON.stringify(regionArr));
        }
        renderFunction(regionArr)
    }
    catch (error) {
        console.log(error)
    }
}
getCity("https://islomapi.uz/api/present/day?region=Toshkent");
const tablefragment = new DocumentFragment();

function WeekrebderFunction(data) {
    tableBody.innerHTML = ""
    data.forEach(item => {
        const secClone = templateTable.cloneNode(true);
        secClone.querySelector(".info__kun").textContent = item.weekday;
        secClone.querySelector(".info__sana").textContent = item.date;
        secClone.querySelector(".info__saharlik").textContent = item.times.tong_saharlik;
        secClone.querySelector(".info__quyosh").textContent = item.times.quyosh;
        secClone.querySelector(".info__peshin").textContent = item.times.peshin;
        secClone.querySelector(".info__asr").textContent = item.times.asr;
        secClone.querySelector(".info__shom").textContent = item.times.shom_iftor;
        secClone.querySelector(".info__xufton").textContent = item.times.hufton;
        tablefragment.appendChild(secClone);
    })
    tableBody.appendChild(tablefragment)
}


/*  table */



const templateTable = document.querySelector(".table__template").content;
async function getWeekFunction(url) {
    try {
        const respons = await fetch(url);
        const data = await respons.json();

        WeekrebderFunction(data)

    } catch (error) {
        console.log(error)
    }
}
getWeekFunction(`https://islomapi.uz/api/present/week?region=Toshkent`);
form.addEventListener("submit", evt => {
    evt.preventDefault();
    const selectVAlue = select.value;
    localStorage.setItem("citynmae", JSON.stringify(selectVAlue));
    getCity(`https://islomapi.uz/api/present/day?region=${selectVAlue}`);
    getWeekFunction(`https://islomapi.uz/api/present/week?region=${selectVAlue}`);
})
const gray = document.querySelector(".gray");
gray.addEventListener("click", evt => {
    evt.preventDefault();
    document.body.classList.toggle("dark");
})


/*    haftalik click part  */
const tableSite = document.querySelector(".site-table");
haftalik.addEventListener("click", evt => {
    evt.preventDefault();
    list.classList.add("display");
    tableSite.classList.add("block");
    tableLast.classList.remove("last")



})
kunlik.addEventListener("click", evt => {
    list.classList.remove("display");
    tableSite.classList.remove("block");
})
/* oylik  */
const monthBody = document.querySelector(".month__body");
const monthSelect = document.querySelector(".monthselect");
const monthForm = document.querySelector(".monthform")
const monttemplate = document.querySelector(".month__template").content;
function MonthRenderFunction(arr) {

    arr.forEach(item => {
        monthBody.innerHTML = ""

        const threeClone = monttemplate.cloneNode(true);
        threeClone.querySelector(".month_day").textContent = item.day;
        threeClone.querySelector(".month__data").textContent = String(item.date).slice(0, 10);
        // console.log(String(item.date).slice(0, 10))
        threeClone.querySelector(".month__saharlik").textContent = item.times.tong_saharlik;
        threeClone.querySelector(".month__quyosh").textContent = item.times.quyosh;
        threeClone.querySelector(".month__peshin").textContent = item.times.peshin;
        threeClone.querySelector(".month__asr").textContent = item.times.asr;
        threeClone.querySelector(".month__shom").textContent = item.times.shom_iftor;
        threeClone.querySelector(".month__hufton").textContent = item.times.hufton;
        fragment.appendChild(threeClone);
    })
    monthBody.appendChild(fragment)
}


async function MonthGetFunction(url) {
    try {
        const respons = await fetch(url);
        const data = await respons.json();
        MonthRenderFunction(data)
    } catch (error) {
        console.log(error)
    }
}
MonthGetFunction(`https://islomapi.uz/api/monthly?region=Toshkent&month=1`)
monthForm.addEventListener("submit", evt => {
    evt.preventDefault();
    const monthSelectValeu = monthSelect.value;
    MonthGetFunction(`https://islomapi.uz/api/monthly?region=Toshkent&month=${monthSelectValeu}`)
})
const oylikBtn = document.querySelector(".oylik");
const tableLast = document.querySelector(".site-section-table")
oylikBtn.addEventListener("click", evt => {
    evt.preventDefault();
    list.classList.add("display");
    tableSite.classList.remove("block");
    tableLast.classList.add("last")

})








