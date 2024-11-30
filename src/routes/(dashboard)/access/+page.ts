import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { pb } from "$lib";
import { get } from "svelte/store";

export const load:PageLoad = () => {
    pb.authStore.clear()
    return {}
}