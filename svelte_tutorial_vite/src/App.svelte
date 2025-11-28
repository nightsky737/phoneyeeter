<script>
    import Nested from './Nested.svelte'
    let count = $state(0) // the $ lets it know it is a special variable
    let name = 'Svelte'
    let numbers = $state([1, 2,3])
    let total = $derived(numbers.reduce((t, n) => t + n, 0)) 
    //^lets u force update total as it is derived from numbers so when numbers updates total updates



    function increment(){
        count += 1; //also works when changing the array (mutations(=))
    
        console.log($state.snapshot(numbers)) 
        //gotta log like this (snapshot) bc numbers is a reactive
    }

    $inspect(numbers) //logs snapshot of numbers
</script> 

<!-- Curly braces are javascript vals. -->
<h1>Hoi {name}</h1> 

<p>defined here para</p> 


<!-- foreach loop thingy -->
{#each numbers as item}
<Nested number={item} />
{/each}


<!-- <Nested {...numbers}/> would work if the nubmers were objects instead of ints -->

<style> 
    p{
        color : goldenrod;
    }

    /* Global styels can only be in top-level component.  */
    :global(.button){
        color: green;
    }
</style>  