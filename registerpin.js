document.querySelector(".validate-pin").addEventListener("click", async (e) => {
    e.preventDefault();
    const pin = document.getElementById("pin-input").value.trim();
    const confirmpin = document.getElementById("confirm-pin-input").value.trim();
    const errorBox = document.getElementById("error");
    const phoneNo = document.getElementById("phone-input").value.trim();
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
    // Normalize the number
    if (phoneNo.startsWith("0")) {
        phone = phoneNo.slice(1);
    } else if (phoneNo.startsWith("234")) {
        phone = phoneNo.slice(3);
    } else if (phoneNo.startsWith("+234")) {
        phone = phoneNo.slice(4);
    } else {
        phone = phoneNo;
    }

    // Always prepend +234
    phoneNum = "+234" + phone;
    console.log("Normalized phone number:", phoneNum);
    
    let pinData = {"pin": pin, "confirm_pin":confirmpin, "phone_number":phoneNum};

    pin_validation = await fetch("https://mimic-sparkle-latest.onrender.com/register-pin",
        { method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pinData)
        });
        
    pin_validation = await pin_validation.json();
    console.log(pin_validation);

    if(pin_validation['success'] == True) {
        document.getElementById("pin-input").value = "";
        document.getElementById("confirm-pin-input").value = "";
        errorBox.classList.remove("hidden");
        errorBox.innerHTML += `<li style = "color: green;">Your pin has been registered successfully</li>`;
    }

});
