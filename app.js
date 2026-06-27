const baseUrl = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

const dropDown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const frmCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let amount = document.querySelector(".amount input");

window.addEventListener("load", () => {
     getUsdInrRate();
})

for (let select of dropDown) {
    for (currCode in countryList) {
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;

        if(currCode === "USD" && select.name === "From"){
            newOpt.selected = "Selected";
        }else if(currCode === "INR" && select.name === "To"){
            newOpt.selected = "Selected";
        }

        select.append(newOpt);

    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode =countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

async function getUsdInrRate() {
    // This url will give you currencies UDS/XXX
    const url = `${baseUrl}/${frmCurr.value.toLowerCase()}.json`;

    // Fetch data and get INR rate
    let response = await fetch(url);
    let rjson= await response.json();
    
    let data = rjson[frmCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    
        // .then(response => response.json())
        // .then(data => data[frmCurr.value.toLowerCase()][toCurr.value.toLowerCase()])

    let finalAmt = amount.value * data;
    msg.innerText =`${amount.value} ${frmCurr.value} = ${finalAmt} ${toCurr.value}`;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amtvalue =amount.value;
    if( amtvalue < 1 || amtvalue === "") {
        amount.value ="1";
    }
    getUsdInrRate();
})