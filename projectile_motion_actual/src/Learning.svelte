<script lang="ts">
    let count = $state(0) //$state(x) makes it reactive (rune)
    function inc(){
        count += 1
    }
    let interval = $state(10)
    let numbers = $state([1, 2, 3, 4]) // works fine w ararys/pushing. 
    let total = $derived(numbers.reduce((t,n) => t + n, 0)) // derived forces total to update when numbers updates.
    console.log($state.snapshot(numbers)) // need to log a snapshot
    $inspect(numbers) //will log a snapshot whenever numbers changes.

    let {name = 'idk', age=1} = $props(); //functions can also be passed as props 


    $effect(() => {
        //last resort; put these in an event handler if can
        const id = setInterval(() => {
         inc();
        }, interval) //this runs whenevever interval changes and/or when it is destoryed
    
        return () => {
            clearInterval(id) //this will run before the effect fxn runs.
        }
    }) 
</script>

<!-- theres also file_name.svelte.js to give js syntax in svelte -->

<!-- brackets be js (like in react) -->
<h1>Hi {name} who is {age}</h1> 
<!-- HTML js SYNTAX -->
{#if age > 15}
<p>u unc</p>
{:else if age > 9}
<p>u a child bro</p>
{/if}

<ol>
{#each numbers as num, i}
<li>{num} idx {i}</li>
{/each}
</ol>


<style>
    h1 {
        color: gold;
    }
</style>