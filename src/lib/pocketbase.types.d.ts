/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Forms = "forms",
	Schemas = "schemas",
	Submissions = "submissions",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export enum FormsCaptchaProviderOptions {
	"turnstile" = "turnstile",
	"recaptcha" = "recaptcha",
	"hcaptcha" = "hcaptcha",
}
export type FormsRecord = {
	addresses?: string
	captcha_provider?: FormsCaptchaProviderOptions
	captcha_secret?: string
	created?: IsoDateString
	id: string
	is_dev?: boolean
	schema?: RecordIdString
	schema_check_site?: string
	should_call_webhooks?: boolean
	should_send_mail?: boolean
	title?: string
	updated?: IsoDateString
	user?: RecordIdString
	webhooks?: string
}

export type SchemasRecord<Tfields = unknown> = {
	banner?: string
	created?: IsoDateString
	favicon?: string
	fields: null | Tfields
	form: RecordIdString
	id: string
	iframe?: string
	schema_check_site?: string
	site_title?: string
	updated?: IsoDateString
}

export type SubmissionsRecord<Tdata = unknown> = {
	attachments?: string[]
	created?: IsoDateString
	data?: null | Tdata
	form: RecordIdString
	id: string
	is_hidden?: boolean
	schema: RecordIdString
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type FormsResponse<Texpand = unknown> = Required<FormsRecord> & BaseSystemFields<Texpand>
export type SchemasResponse<Tfields = unknown, Texpand = unknown> = Required<SchemasRecord<Tfields>> & BaseSystemFields<Texpand>
export type SubmissionsResponse<Tdata = unknown, Texpand = unknown> = Required<SubmissionsRecord<Tdata>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	forms: FormsRecord
	schemas: SchemasRecord
	submissions: SubmissionsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	forms: FormsResponse
	schemas: SchemasResponse
	submissions: SubmissionsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'forms'): RecordService<FormsResponse>
	collection(idOrName: 'schemas'): RecordService<SchemasResponse>
	collection(idOrName: 'submissions'): RecordService<SubmissionsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
