<script>
	import { onDestroy } from 'svelte';	
    import tuotteetStore from './tuotteetStore.js';
	
	import Topbar from './Topbar.svelte';
	import Tuotteet from './Tuotteet.svelte';
	import Modal from './Modal.svelte';
	import Button from './Button.svelte';
	import PopUp from './PopUp.svelte';	
	
	let tuotteet = [];
	$: ostoskori = [];
	$: viimeksiLisattyTuote = {};

	let naytaPopUpLisays = false;
	let naytaLisays = false;
	let naytaOstoskori = false;
	let naytaPopUpTilaus = false;

	let uusiTuoteNimi = "";
	let uusiTuoteKuvaus = "";
	let uusiTuoteHinta = 0;

    const unsub = tuotteetStore.subscribe((store) => (tuotteet = store)); 
    onDestroy(()=>{
        if (unsub) {
            unsub();
        };
    });

	function tyhjennaKentat(){
		uusiTuoteNimi = "";
	 	uusiTuoteKuvaus= "";
	 	uusiTuoteHinta = 0;
	}

	function lisaaTuote(){
		
		let uusiId = 1
		if(tuotteet.length > 0){
			uusiId = Math.max(...tuotteet.map((t) => t.id)) + 1;
		}

		let uusiTuote = {
			nimi: uusiTuoteNimi, 
			kuvaus: uusiTuoteKuvaus, 
			hinta: uusiTuoteHinta, 
			id: uusiId
		}

		tuotteetStore.update((store) => [...store, uusiTuote]);
		naytaLisays = false;
		tyhjennaKentat();
	}

	function hinta(){
		let uusiHinta = 0;
		if(ostoskori.length > 0)
		{
			ostoskori.forEach(element => {
				uusiHinta += element.hinta
			});
		}

		return uusiHinta;
	}

	const kasitteleLisays = (tuote) =>{

		let uusiId = 1
		if(ostoskori.length > 0){
			uusiId = Math.max(...ostoskori.map((k) => k.ostoskoriId)) + 1;
		}

		let uusiTuote = {
			nimi: tuote.detail.nimi, 
			kuvaus: tuote.detail.kuvaus, 
			hinta: tuote.detail.hinta, 
			id: tuote.detail.id,
			ostoskoriId: uusiId
		}

		viimeksiLisattyTuote = uusiTuote;

		ostoskori = [...ostoskori, uusiTuote];
		naytaPopUpLisays = true;
	}

	function peruutaTilaus(){
		naytaOstoskori = false;
		ostoskori = [];
	}

	function tilaa(){
		peruutaTilaus();
		naytaPopUpTilaus = true;
	}

	function voiTilata(){
		let voiTilata = true;

		if(hinta() > 0){
			voiTilata = false;
		}
		return voiTilata;
	}
	
	function OnkoValidiTeksti(teksti)
	{
		if(teksti.trim().length > 0){
			return true;
		}else{
			return false;
		}
	}


</script>

<Topbar header="Eetun eläinkauppa!"/>

<main>
	<h1>Tuotteet</h1>
	<Button on:click={() => naytaLisays = !naytaLisays}>Lisää tuote</Button>
	<Button on:click={() => naytaOstoskori = !naytaOstoskori}>Ostoskori</Button>
	<div><Tuotteet on:lisaaOstoskoriin={kasitteleLisays}/></div>
</main>

{#if naytaLisays}
	<Modal>
		<h1 slot="header">Lisää tuote</h1>
		
		<div slot="footer">
			<label for="nimi">Tuotteen nimi</label>
			<div><input type="text" id="nimi" bind:value={uusiTuoteNimi}></div>

			<label for="kuvaus">Kuvaus</label>
			<div><input type="text" id="kuvaus" bind:value={uusiTuoteKuvaus}></div>

			<label for="numero">Hinta</label>
			<div><input type="number" id="numero" bind:value={uusiTuoteHinta}></div>
			
			{#if (!OnkoValidiTeksti(uusiTuoteNimi) || !OnkoValidiTeksti(uusiTuoteKuvaus) || !(uusiTuoteHinta > 0))}
			 <p>Lisää nimi, kuvaus sekä hinta!</p>
			{/if}

			<Button on:click={lisaaTuote} disabled={!OnkoValidiTeksti(uusiTuoteNimi) || !OnkoValidiTeksti(uusiTuoteKuvaus) || !(uusiTuoteHinta > 0)}>Lisää tuote</Button>
			<Button on:click={() => naytaLisays = !naytaLisays}>Peruuta</Button>
		</div>
	</Modal>
{/if}

{#if naytaOstoskori}
	<Modal>
		<h1 slot="header">Ostoskori</h1>
		
		<div slot="footer">

			{#if (ostoskori.length > 0)}

				{#each ostoskori as tuote (tuote.ostoskoriId)}
					<div>
						<h2>{tuote.nimi}</h2>
						<p>Kuvaus: {tuote.kuvaus}</p>
						<p>Hinta: {tuote.hinta}€</p>
					</div>  
				{/each}
				
			{:else}
				<p> Ostoskori on tyhjä!</p>
		    {/if}
		
			<div>
				<p><b>Hinta yhteensä: {hinta()}€</b></p>
			</div>

			<Button on:click={tilaa} disabled={voiTilata()}>Tilaa</Button>
			<Button on:click={() => naytaOstoskori = !naytaOstoskori}>Jatka</Button>
			<Button on:click={peruutaTilaus} disabled={voiTilata()}>Tyhjennä Ostoskori</Button>
		</div>
	</Modal>
{/if}

{#if naytaPopUpLisays}
	<PopUp tuotteenNimi={viimeksiLisattyTuote.nimi} teksti="on lisätty ostoskoriin!" on:piilota={() => naytaPopUpLisays = !naytaPopUpLisays}/>
{/if}

{#if naytaPopUpTilaus}
	<PopUp tuotteenNimi=" " teksti="Tilaus on tehty!" on:piilota={() => naytaPopUpTilaus = !naytaPopUpTilaus}/>
{/if}

<style>
	main {
		text-align: center;
		padding-top: 8em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>