import { redirect, type Actions } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({params}) => {
    redirect(303, `${params.form}/submissions/`)
};