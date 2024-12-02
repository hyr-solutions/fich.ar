import Pocketbase from 'pocketbase'
import { PUBLIC_POCKETBASE_BASE_URL } from '$env/static/public'
import { writable } from 'svelte/store'
import type { SchemasResponse, FormsResponse, TypedPocketBase, UsersResponse } from './pocketbase.types'
import { type ParsedField } from './schema'

export const pb = new Pocketbase(PUBLIC_POCKETBASE_BASE_URL || undefined) as TypedPocketBase

export const user = writable(pb.authStore.model)

pb.authStore.onChange((_, model) => {
	user.set(model)
}, true)

export type SchemaWithJSON = SchemasResponse<
	ParsedField[],
	{
		favicon: string
		iframe: string
		image: string
		title: string
	}
>
export type FormsResponseWithSchema = FormsResponse<{ schema: SchemaWithJSON }>

export type FormsResponseWithSchemaAndUser = FormsResponse<{ schema: SchemaWithJSON; user: UsersResponse }>
