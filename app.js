const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_XcytgViDukIXztNRXgcE1PwYU2IRMmRQ3UUf0nig";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")
const dropdown1 = document.getElementById("dropdown1");
const dropdown2 = document.getElementById("dropdown2");
const flag1 = document.getElementById("flag1");
const flag2 = document.getElementById("flag2");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const swapDropdowns = () => {
    //update dropdown values
    const tempValue = dropdown1.value;
    dropdown1.value = dropdown2.value;
    dropdown2.value = tempValue;

    //update flag
    const tempSrc = flag1.src;
    flag1.src = flag2.src;
    flag2.src = tempSrc;
    updateFlag({ target: dropdown1 });
    updateFlag({ target: dropdown2 });
}


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}&base_currency=${fromCurr.value}&currencies[]=${toCurr.value}&type=fiat`;
    const response = await fetch(URL);
    const data = await response.json();
    const rate = data.data[toCurr.value].value;

    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${Math.round(finalAmt)} ${toCurr.value}`;
})