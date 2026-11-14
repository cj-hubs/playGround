console.log("Main js loaded");
function openCarFeatures(carType) {
    window.location.href = `car-features.html?type=${carType}`;
}
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!bookingForm.reportValidity()) return;

    const data = new FormData(bookingForm);

    const fields = [
        ['Booking Enquiry - JKM Tours & Travels', ''],
        ['Name', data.get('name')],
        ['Customer Phone', data.get('phone')],
        ['Pickup', data.get('pickup')],
        ['Destination', data.get('destination')],
        ['Travel Date', data.get('date')],
        ['Pickup Time', data.get('time')],
        ['Vehicle Category', data.get('vehicle')],
        ['Trip Type', data.get('trip')],
        ['Passengers', data.get('passengers')],
        ['Additional Requirements', data.get('notes') || 'None'],
    ];

    const message = fields
        .map(([key, value]) => value ? `${key}: ${value}` : key)
        .join('\n');


    let parms = {
        subject: "JKM Travels Enquiry",
        name: data.get('name'),
        message: message,
    };

    emailjs.send("service_9b424pr", "template_mya197q", parms)
        .then((response) => {
            alert("Enquiry placed successfully!");
            console.log("SUCCESS!", response.status, response.text);
        })
        .catch((error) => {
            alert("Failed to send enquiry. Please try again.");
            console.error("FAILED...", error);
        });

        
    document.getElementById('bookingMessage').value = message;
    document.getElementById('bookingOutput').hidden = false;

    document.getElementById('bookingStatus').textContent =
        'Your enquiry has been prepared. Please copy the message below and share it with JKM Tours & Travels. Online submission will be enabled after the business contact details are added.';

    document.getElementById('bookingOutput').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
});

document.getElementById('copyBooking').addEventListener('click', async function () {
    const text = document.getElementById('bookingMessage').value;

    try {
        await navigator.clipboard.writeText(text);
        this.textContent = 'Copied ✓';
    } catch (e) {
        const box = document.getElementById('bookingMessage');

        box.focus();
        box.select();

        this.textContent = 'Select and copy the enquiry';
    }
});
