import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = Number(form.elements.delay.value);
    const radioBtn = form.elements.state.value;


    const promise = new Promise((resolve, reject) => {
       setTimeout(() => {
            if (radioBtn === 'fulfilled') { resolve(delay) } else { reject(delay) }
        }, delay);
        
    
    });
    form.reset();

    
    promise
    .then(delay => {
        iziToast.success({ message: `✅ Fulfilled promise in ${delay}ms`, position: 'topCenter',timeout: 1000, progressBar:false, close: false});
    }).catch(delay => {
        iziToast.error({ message: `❌ Rejected promise in ${delay}ms`, position: 'topCenter',timeout: 1000, progressBar:false, close: false});
    });
    
});