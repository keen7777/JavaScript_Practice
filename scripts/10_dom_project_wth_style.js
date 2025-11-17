// js code
// first subscribe:
function clickSubscribe(btn_element) {
    if (btn_element.innerText === 'Subscribe') {
        btn_element.innerText = 'Subscribed'
        // here it add a new class to style after changing the text.!!!
        btn_element.classList.add('is-subscribed');
    } else if (btn_element.innerText === 'Subscribed') {
        btn_element.innerText = 'Subscribe'
        btn_element.classList.remove('is-subscribed');
    }
}

function calculateTotal() {
    const input_element = document.querySelector('.js-cost-input');
    let price = Number(input_element.value).toFixed(2);
    price = Number(price);
    // adding error message for nagative price:
    const output = document.querySelector('.js-total-cost');
    if (price < 0) {
        output.classList.add('error-total-cost');
        output.innerText = `Error: cost cannot be less than $0.`;
        return;
    }
    // use cent to calculate!
    if (price * 100 < 4000) {
        price = (price * 100 + 1000) / 100;
    }
    output.innerText = `$ ${price}`;
    output.classList.remove('error-total-cost');
    return;
}

// 2nd using event delegation ===================
document.body.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    // only for buttons.
    if (!button) {
        return;
    }

    const type = button.dataset.type;

    if (type === 'js-sub') {
        // use inner text will ignore the surrounding spaces
        const btn_element = document.querySelector('.js-subscribe-btn');
        clickSubscribe(btn_element);
    }

    if (type === 'js-cal') {
        calculateTotal();
    }

}); // 2nd

//keydown logic:
document.body.addEventListener('keydown', (e) => {
    // that's for all
    // if (e.key === 'Enter') {
    //    calculateTotal();}

    const cal_btn = document.querySelector('.js-cal-btn');
    if (e.key === 'Enter') {
        cal_btn.click(); //recall the click button logic
    }

    // normally we have clicks, keydowns scroll, mouseenter... as events
    // onclick, onkeydown,scrolling, hovering over... as event listeners


}); // 2nd