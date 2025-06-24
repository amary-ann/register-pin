document.querySelector(".validate-pin").addEventListener("click", async (e) => {
    e.preventDefault();
    const pin = document.getElementById("pin-input").value.trim();
    const confirmpin = document.getElementById("confirm-pin-input").value.trim();
    const errorBox = document.getElementById("error");
    console.log("Pin entered:", pin);
    if (pin.length !== 6 || isNaN(pin)) {
        errorBox.classList.remove("hidden");
        errorBox.innerHTML += `<li style="color: red;">Please enter a valid 6-digit PIN.</li>
    `;
        return;
    }
    if (pin !== confirmpin){
        errorBox.classList.remove("hidden");
        errorBox.innerHTML += `<li style="color: red;">Pins do not match!.</li>
    `;
        return;
    }
    let pinData = {"pin": pin, "confirm_pin":confirmpin, "phone_number":"+2348183808266"};

    console.log(JSON.stringify(pinData));

    pin_validation = await fetch("https://mimic-sparkle.onrender.com/register-pin",
        { method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pinData)
        });
        
    pin_validation = await pin_validation.json();
    console.log(pin_validation);

    if(pin_validation['success'] == true) {
        document.getElementById("pin-input").value = "";
        document.getElementById("confirm-pin-input").value = "";
        errorBox.classList.remove("hidden");
        errorBox.innerHTML += `<li style = "color: green;">Your pin has been registered successfully</li>`;
    }

});
