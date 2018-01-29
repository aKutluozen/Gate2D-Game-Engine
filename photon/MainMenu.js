var storeElement = document.getElementById('store-menu');

function showStore() {
    storeElement.classList.remove('hide');
    storeElement.classList.add('show');
}

function closeStore() {
    storeElement.classList.remove('show');
    storeElement.classList.add('hide');
}

function getItem(itemName) {
    switch (itemName) {
        case 'super_lumen': {
            localStorage.setItem('super_lumen', 1);
        } break;
        case 'photon_wall': {
            localStorage.setItem('photon_wall', 1);
        } break;
        case 'rapid_fire': {
            localStorage.setItem('rapid_fire', 1);
        } break;
        case 'ghost': {
            localStorage.setItem('ghost', 1);
        } break;
        default: {
            console.log('not a valid item');
        } break;
    }
}