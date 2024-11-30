<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib';

	let accessing = $state(false);

	function handleAccess(
		method:
			 {
					provider: string;
			  }
			| {
					user: string;
					password: string;
			  }
	) {
		return async () => {
			accessing = true;
            if ("provider" in method) {
                await pb
				.collection('users')
				.authWithOAuth2(method)
				.then(()=>{
					goto('/dashboard')
				})
				.finally(() => {
					accessing = false;
				});
            } else {
                //handle with email and pass
            }
		};
	}
</script>

<section
	class="relative min-h-screen"
>
	<div class="absolute inset-x-0 w-fit mx-auto bottom-0 top-[20vh] rounded bg-slate-950">
		<div class="relative mx-auto w-full max-w-xl p-10 pt-8 text-white text-center flex flex-col items-center mt-auto">
			<h1 class="text-4xl font-bold">Signup or Login</h1>
			<p class="mt-3 text-slate-400">
				If you don't have an account,<br class="sm:hidden" /> you can signup.<br />Otherwise login.
				Duh.
			</p>
			<div class="mt-16">
				<button
					onclick={handleAccess({provider: 'google'})}
					class="flex items-center rounded bg-slate-200 p-6 pr-5 font-semibold text-black transition-all hover:bg-white hover:px-16"
				>
					Continue with Google 
					<svg
						class="-my-4 {accessing && 'icon-[lucide--loader-circle] animate-spin'} ml-4 text-4xl"
						xmlns="http://www.w3.org/2000/svg"
						width="0.98em"
						height="1em"
						viewBox="0 0 256 262"
						><path
							fill="#4285f4"
							d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
						/><path
							fill="#34a853"
							d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
						/><path
							fill="#fbbc05"
							d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
						/><path
							fill="#eb4335"
							d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
						/></svg
					>
				</button>
			</div>
			<a
				href="/"
				class="absolute -bottom-14 left-0 right-0 mx-auto flex w-fit items-center rounded px-3 py-2 pl-2 font-medium text-slate-200 transition-all hover:bg-white hover:px-6 hover:text-black"
			>
				<span class="icon-[lucide--corner-down-left] -mb-0.5 mr-2 text-2xl"></span>
				Back to landing
			</a>
		</div>
	</div>
</section>
