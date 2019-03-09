//this file is to be used to register service workers on each page (or so I think)

if('serviceWorker' in navigator)
{
	window.addEventListener('load', function()
									{
									navigator.serviceWorker.register('pwaFiles/sw.js', {scope: '/public_html/pwaFiles/'}).then(reg=>console.log("Service Worker Successfully Registered")).catch(err => console.log(`Failed To Register Service Worker: ${err}`));
									});
}
else
{
	console.log("Service Workers Not Supported");
}