<script>
    import { createEventDispatcher } from 'svelte';
    import { fly, blur } from 'svelte/transition';
    import { elasticOut } from 'svelte/easing';

    const dispatch = createEventDispatcher();

    setTimeout(() => {
        dispatch('piilota');
    }, 2000)

    export let tuotteenNimi;
    export let teksti;

</script>

<div class="pop-up" in:fly={{ y: -200, duration: 1000, easing: elasticOut}} out:blur>
    <p>
        {tuotteenNimi} {teksti}
    </p>
</div>

<style>
    .pop-up{
        position: fixed;
        top: 12em;
        right: 3em;
        width: 20em;
        height: 3em;
        background-color: rgb(163, 167, 175);
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
        text-align: center;
    }
</style>