const iframe = document.createElement('iframe');
iframe.src = 'https://sparklemimicfrontend.netlify.app/'; // point to your static HTML
iframe.style.display = 'none';
document.body.appendChild(iframe);
iframe.onload = () => {
    iframe.contentWindow.postMessage('getPhoneNumber', 'https://sparklemimicfrontend.netlify.app/');
    };

document.querySelector(".validate-pin").addEventListener("click", async (e) => {
    e.preventDefault();
    const pin = document.getElementById("pin-input").value.trim();
    const confirmpin = document.getElementById("confirm-pin-input").value.trim();
    const errorBox = document.getElementById("error");
    
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
    
    const phoneNumber = await new Promise((resolve) => {
        const handler = (event) => {
            if (event.origin === 'https://sparklemimicfrontend.netlify.app/' && event.data.phoneNumber) {
                window.removeEventListener('message', handler);
                resolve(event.data.phoneNumber);
            }
        };
        window.addEventListener('message', handler);
    });

    if (phoneNumber.startsWith("0")) {
        phone = phoneNumber.slice(1);
    } else if (phoneNumber.startsWith("234")) {
        phone = phoneNumber.slice(3);
    } else if (phoneNumber.startsWith("+234")) {
        phone = phoneNumber.slice(4);
    } else {
        phone = phoneNumber;
    }
          
    // Always prepend +234
    phoneNo = "+234" + phone;
    let pinData = {"pin": pin, "confirm_pin":confirmpin, "phone_number":phoneNo};

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
