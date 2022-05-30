let searchedPhone = document.querySelector(".searched-phone")
let extraPhone = document.querySelector(".extra")
let viewedPhone = document.querySelector(".viewedPhone")
let input = document.querySelector("#input")
let btn = document.querySelector("#button-search")
let spinner = document.querySelector(".load-content")
spinner.style.display = "none"



const loadData = (input) => {

    fetch(`https://openapi.programming-hero.com/api/phones?search=${input || ""}`)
        .then(res => res.json())
        .then(data => display_data(data.data))

}

loadData("samsung")

function displayExtraData(phones) {
    const newPhone = phones.slice(21, phones.length)
    console.log(newPhone)
    newPhone.forEach(phone => [
        extraPhone.innerHTML += `
    <div class="card p-4 rounded-3 col-12 col-md-4" style="width: 20rem;">
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${phone.brand}</h5>
        <h6 class="">${phone.phone_name}</h6>
        <p class="card-text">This is a unique phone. You can buy it Now</p>
        <a href="#" class="btn btn-primary detail-btn mt-3" onclick="view_Phone('${phone.slug}')">See Dertails</a>
    </div>
    </div>
    `
    ])
}

const display_data = (phones) => {
    const div = document.createElement("div")
    let divClass = ["d-flex", "justify-content-center", "align-items-center"]
    div.classList.add(...divClass)
    console.log(div)
    let button = document.createElement("button")
    button.addEventListener("click", function () {
        displayExtraData(phones)
    });
    button.style.width = "200px";
    button.style.display = "block";
    button.classList.add("btn");
    button.innerText = "see All";
    button.classList.add("btn-primary");
    if (phones.length == 0) {
        searchedPhone.innerHTML = "Your Search item is not here"
    } else {

        phones.forEach((phone, index) => {
            if (index < 20) {
                searchedPhone.innerHTML += `
            <div class="card p-4 rounded-3 col-12 col-md-4" style="width: 20rem;">
                  <img src="${phone.image}" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title ">${phone.brand}</h5>
                      <h6 class="text-dark">${phone.phone_name}</h6>
                      <p class="card-text">Our Product Our Guranty</p>
                      <a href="#" class="btn btn-primary detail-btn" onclick="view_Phone('${phone.slug}')">See Dertails</a>
                  </div>
              </div>
            `
            }
        });
        div.append(button)
        searchedPhone.append(div)
    }

    spinner.style.display = "none"
}

btn.addEventListener("click", function () {
    if (input.value == "") {
        alert("Write Your favourite item")
    } else {
        spinner.style.display = "block"
        searchedPhone.innerHTML = "";
        viewedPhone.style.display = "none"
        loadData(input.value)

    }
    input.value = ''
})


function view_Phone(phone) {
    viewedPhone.style.display = "block"
    fetch(`https://openapi.programming-hero.com/api/phone/${phone}`)
        .then(res => res.json())
        .then(data => {
            showPhone(data.data)
            console.log(data.data)
        })
}

function showPhone(phone) {
    console.log(phone)
    viewedPhone.innerHTML = `
<div class="card my-card mb-3 mt-3 p-4" style="max-width:1400px;">
    <div  class = "row g-2">
        <div class ="col-12 col-md-4">
                <img  src="${phone.image}" class="card-img-top mx-auto" style="max-width:500px;" alt="...">      
        </div>
        <div class ="col-12 col-md-8">
            <div class="card-body  row">
                <div class="col-12">
                    <h5 class="card-title fs-1 fw-bold text-center">${phone.brand}</h5>
                    <h6 class="text-center">${phone.name}</h6>
                    <h6 class="text-danger fs-3 fw-bold text-center">${phone.releaseDate ? phone.releaseDate : "No realese date"}</h6>
                </div>

                <div class="col-12 col-lg-6 mt-4">
                        <p class="fs-2 text-center fw-bold mt-3 ">MainFeatures</p>
                        <hr>
                        <p class="card-text fw-bold ms-4">Chipset : ${phone.mainFeatures.chipSet}</p>
                        <p class="card-text fw-bold ms-4">Displaysize : ${phone.mainFeatures.displaySize}</p>
                        <p class="card-text fw-bold ms-4">Sensors : ${phone.mainFeatures.sensors}</p>
                        <p class="card-text fw-bold ms-4">Storage : ${phone.mainFeatures.storage}</p>
                        <p class="card-text fw-bold ms-4">Memory : ${phone.mainFeatures.memory}</p>
                </div>

                <div class="col-12 col-lg-6 mt-5 ">
                        <p class=" fs-2 text-center fw-bold ">Others</p>
                        <hr>
                        <p class="card-text fw-bold ms-5">WLAN : ${phone.others.WLAN}</p>
                        <p class="card-text fw-bold ms-5">Displaysize : ${phone.others.Blutooth}</p>
                        <p class="card-text fw-bold ms-5">Storage : ${phone.others.NFC}</p>
                        <p class="card-text fw-bold ms-5">Memory : ${phone.others.Radio}</p>
                        <p class="card-text fw-bold ms-5">Memory : ${phone.others.USB}</p>
                        <p class="card-text fw-bold ms-5">Memory : ${phone.others.GPS}</p>
                        <a href="#" class="btn btn-danger detail-btn mt-5">Buy Now</a>
                </div>
            
            </div>
        </div>
    </div>
</div>
 `
}