import Pocketbase from 'pocketbase'
import { PUBLIC_POCKETBASE_BASE_URL } from '$env/static/public'
import { writable } from 'svelte/store'

export const pb = new Pocketbase(PUBLIC_POCKETBASE_BASE_URL)

export const user = writable(pb.authStore.model)

pb.authStore.onChange((_, model)=>{
    user.set(model)
}, true)