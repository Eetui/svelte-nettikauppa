<script>

    import tuotteetStore from './tuotteetStore.js';
    import { onDestroy, createEventDispatcher } from 'svelte';
    import { flip } from 'svelte/animate';
    import { fade } from 'svelte/transition';
    import Button from './Button.svelte';

    const dispatch = createEventDispatcher();
    const lisaaOstoskoriin = (tuote) => dispatch("lisaaOstoskoriin", tuote);
    
    let tuotteet = [];

    const unsub = tuotteetStore.subscribe((store) => (tuotteet = store));
    
    onDestroy(()=>{
        if (unsub) {
            unsub();
        };
    });

    function poistaTuote(tuoteId)
    {
        let uusiTuotelista = tuotteet.filter(tuotelista => tuotelista.id != tuoteId);
        tuotteetStore.update((tuotteetStore) => [...uusiTuotelista]);
    };

</script>

{#if tuotteet.length > 0 }

    {#each tuotteet as tuote (tuote.id)}

        <div class="tuote" animate:flip|local={{duration: 200}} out:fade={{duration: 200}}>
            <h2>{tuote.nimi}</h2>
            <p>Kuvaus: {tuote.kuvaus}</p>
            <p>Hinta: {tuote.hinta}€</p>

            <Button on:click={lisaaOstoskoriin(tuote)}>Lisää Ostoskoriin</Button>
            <Button on:click={poistaTuote(tuote.id)}>Poista</Button>

        </div>  

    {/each}

{:else}
        <div>
            <h2>Ei tuotteita</h2>
        </div>
{/if}



<style>
    .tuote {
        background-color: lightgrey;
        width: 40%;
        border: 3px solid blue;
        padding: 50px;
        margin: 20px;
        display: inline-table;
    }
</style>