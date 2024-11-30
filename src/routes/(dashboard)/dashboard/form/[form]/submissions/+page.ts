import { pb } from '$lib';
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, params, url}) => {
    
    let submissions = await pb.collection('submissions').getList(0, 100, {
        filter: `form = '${params.form}' && schema = form.schema`,
        sort: '-created',
        perPage: Math.round((window.innerHeight-(20*16)-52)/28),
        page: Number(url.searchParams.get('page')??1),
        fetch
    })
    return {
        submissions
    }
};