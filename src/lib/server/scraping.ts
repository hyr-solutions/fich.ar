import { BROWSERLESS_BASE_URL, BROWSERLESS_TOKEN, ORIGIN } from '$env/static/private'

// import puppeteer from 'puppeteer-core'
// import playwright from 'playwright-core'
import puppeteer from '@cloudflare/puppeteer'

export class Scraping {
	static async browse(site: string) {
		let browserWSEndpoint = new URL(BROWSERLESS_BASE_URL)
		browserWSEndpoint.protocol = 'ws:'
		browserWSEndpoint.searchParams.set('token', BROWSERLESS_TOKEN)

		const browser = await puppeteer.connect({
			browserWSEndpoint: browserWSEndpoint.toString()
		})
		// const browser = await playwright.chromium.connectOverCDP(browserWSEndpoint.toString())
		// const context = await browser.newContext()
		// const page = await context.newPage()
		const page = await browser.newPage()

		let expectedIframeURL = new URL(ORIGIN)
		// expectedIframeURL.pathname = formId

		let siteURL = new URL(site)
		siteURL.protocol = 'https://'

		await page.goto(siteURL.toString(), { waitUntil: 'networkidle2' })
		if (import.meta.env.DEV) {
			console.info('[INFO] Adding ngrok bypass headers.')
			console.warn("[WARN] You shouldn't be able to read this in production!")
			await page.setExtraHTTPHeaders({ 'ngrok-skip-browser-warning': 'indeed' })
		}

		let pageResults = await page
			.evaluate((expectedIframeURL) => {
				let iframe = (document.querySelector(`iframe[src*="${expectedIframeURL}"]`) as HTMLIFrameElement)?.src || ''
				let favicon = (document.querySelector('link[rel*="icon"]') as HTMLLinkElement)?.href || ''
				let banner = (document.querySelector('meta[property*="image"]') as HTMLMetaElement | null)?.content || ''

				let title: string = document.title

				return {
					iframe,
					favicon,
					banner,
					title,
					thumb: null as File | null
				}
			}, expectedIframeURL)
			.catch((err) => {
				console.error('[ERROR] Happened when evaluating code to extract data when scraping the user-provided site url: \n', err)
				return null
			})

		// if (pageResults) {
		// 	try {
		// 		const frames = await page.frames()

		// 		const iframeElement = await page.$(`iframe[src*="${expectedIframeURL}"]`)
		// 		await iframeElement?.scrollIntoView()
		// 		await page.waitForNetworkIdle()

		// 		const thumbUintArray = await iframeElement?.screenshot({
		// 			type: 'jpeg',
		// 			optimizeForSpeed: true,
		// 			quality: 60
		// 		})
		// 		if (thumbUintArray) {
		// 			const thumb = new File([thumbUintArray], `${siteURL.hostname}.png`)
		// 			return {
		// 				...pageResults,
		// 				thumb
		// 			}
		// 		}
		// 	} catch (e) {}
		// }

		console.info(`[INFO] Got the following data: \n`, pageResults)
		await browser.close()
		return pageResults
	}
}
