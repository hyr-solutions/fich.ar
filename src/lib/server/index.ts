import {
	ADMIN_POCKETBASE_TOKEN,
	BROWSERLESS_BASE_URL,
	BROWSERLESS_TOKEN
} from '$env/static/private'
import { PUBLIC_HOST, PUBLIC_POCKETBASE_BASE_URL } from '$env/static/public'
import puppeteer from 'puppeteer-core'
import Pocketbase from 'pocketbase'
import type { TypedPocketBase } from '$lib/pocketbase'

export async function checkSiteFormSchema(siteUrl: string, formId: string) {
	let browserWSEndpoint = new URL(BROWSERLESS_BASE_URL)
	browserWSEndpoint.protocol = 'ws:'
	browserWSEndpoint.searchParams.set('token', BROWSERLESS_TOKEN)

	const browser = await puppeteer.connect({
		browserWSEndpoint: browserWSEndpoint.toString()
	})
	const page = await browser.newPage()

	let expectedIframeURL = new URL(PUBLIC_HOST)
	expectedIframeURL.pathname = formId

	let parsedSiteUrl = new URL(siteUrl)
	parsedSiteUrl.protocol = 'https://'
	await page.goto(parsedSiteUrl.toString(), { waitUntil: 'networkidle2' })

	const pageResults = await page
		.evaluate((expectedIframeURL) => {
			let iframeElement: HTMLIFrameElement | null = document.querySelector(
				`iframe[src*="${expectedIframeURL}"]`
			)
			let faviconElement: HTMLLinkElement | null = document.querySelector('link[rel*="icon"]')
			let imageElement: HTMLMetaElement | null = document.querySelector('meta[property*="image"]')
			let title: string = document.title

			return {
				iframe: iframeElement?.src ?? '',
				favicon: faviconElement?.href ?? '',
				image: imageElement?.content ?? '',
				title: title
			}
		}, expectedIframeURL)
		.catch((err) => {
			console.log(err)
			return null
		})

	console.log(`[INFO] Got the following data: \n`, pageResults)
	await browser.close()
	return pageResults
}

export async function makeClientPb(cookie: string) {
	const pb = new Pocketbase(PUBLIC_POCKETBASE_BASE_URL) as TypedPocketBase
	pb.autoCancellation(false)
	pb.authStore.loadFromCookie(cookie)
	if (pb.authStore.isValid) {
		await pb.collection('users').authRefresh()
		return pb
	}
	pb.authStore.clear()
	return null
}

export async function makeAdminPb() {
	const pb = new Pocketbase(PUBLIC_POCKETBASE_BASE_URL) as TypedPocketBase
	pb.autoCancellation(false)
	pb.authStore.save(ADMIN_POCKETBASE_TOKEN, null)

	return pb
}
