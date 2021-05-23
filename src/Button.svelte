<script>
    export let disabled = false;
</script>

<button class="button" disabled={disabled} on:click><slot></slot></button>

<style>
    .button {
        box-shadow: 4px 4px 0px 0px #1564ad;
        background:linear-gradient(to bottom, #79bbff 5%, #378de5 100%);
        background-color:#79bbff;
        border-radius:5px;
        border:1px solid #337bc4;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-family:Arial;
        font-size:16px;
        font-weight:bold;
        padding:8px 49px;
        text-decoration:none;
        text-shadow:0px 1px 2px #528ecc;
        margin-left: 5px;
        margin-right: 5px;
    }
    .button:hover {
        background:linear-gradient(to bottom, #378de5 5%, #79bbff 100%);
        background-color:#378de5;
    }
    .button:active {
        position:relative;
        top:1px;
    }
    .button:disabled{
     background: #c9c9d5;
     text-shadow:0px 1px 2px #3c3e41;
     box-shadow: 4px 4px 0px 0px #454648;
     border:1px solid #303131;
    }
    
</style>
