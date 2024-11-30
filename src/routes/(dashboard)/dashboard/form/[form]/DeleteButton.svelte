<script lang="ts">
	import { goto } from "$app/navigation";
	import { pb } from "$lib";

    const props = $props()
    const { form } = $derived(props)
</script>
<form onsubmit={async (e)=>{
    e.preventDefault()
    let data = Object.fromEntries(new FormData(e.currentTarget))
    if (data.delete_it !== 'on') return;
    
    await pb.collection('forms').delete(form)
    await goto('/dashboard', {
    	invalidateAll: true
    })
}} {...props} class="mt-8 flex flex-wrap gap-2 items-center group font-medium w-full {props.class}">
    <div class="-ml-2 group-has-[:checked]:ml-0 w-0 group-has-[:checked]:w-64 text-slate-300 overflow-hidden whitespace-nowrap transition-all">Are you sure about that?</div>
    <label class="-ml-2 group-has-[:checked]:ml-0 w-0 overflow-hidden hover:bg-green-500 rounded h-10 group-has-[:checked]:px-3 hover:text-black group-has-[:checked]:w-24 cursor-pointer flex gap-2 items-center text-green-400 transition-all" for="delete-this-dumb-form">
        Sike. <span class="icon-[lucide--undo-2] text-2xl"></span>
    </label>

    <label class="border-2 group-has-[:checked]:hidden cursor-pointer has-[:checked]:border-transparent border-transparent hover:border-current text-red-400 flex items-center gap-2 h-10 px-3 transition-all rounded">
        <input name="delete_it" class="sr-only" id="delete-this-dumb-form" type="checkbox"/>
        <span>Delete Form</span> <span class="icon-[lucide--trash-2] text-2xl -my-4"></span>
    </label>
    <button type="submit" class="border-2 cursor-pointer group-has-[:checked]:flex hidden border-transparent hover:border-red-500 hover:bg-red-500 text-red-400 hover:text-black items-center gap-2 h-10 px-3 transition-all rounded">
        <span>Delete it Fr, No Cap.</span> <span class="icon-[lucide--trash-2] text-2xl -my-4"></span>
    </button>
</form>