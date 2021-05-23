import { writable } from 'svelte/store';

const tuotteet = writable([
    { nimi: "Kaulapanta", kuvaus: "Musta kaulapanta koko S", hinta: 10, id: 1 },
    { nimi: 'Ruokakuppi', kuvaus: "Keraaminen ruokakuppi", hinta: 5, id: 2 },
    { nimi: 'Lelu', kuvaus: "Vinkuva lelu", hinta: 6, id: 3 },
]);

export default tuotteet;