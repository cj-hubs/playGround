
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
        ['Service Area', 'Coimbatore']
    ];

    const message = fields
        .map(([key, value]) => value ? `${key}: ${value}` : key)
        .join('\n');

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
