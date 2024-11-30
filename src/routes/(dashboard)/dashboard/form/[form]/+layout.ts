import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";


export const load: LayoutLoad = async ({ parent, params }) => {
    let data = await parent()
    let form = data.forms.items.find(f=>f.id === params.form);
    if (!form) return error(404)

    return {
        form
    }
}