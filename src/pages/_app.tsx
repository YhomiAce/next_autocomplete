import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  function initMap() {
    console.log("callback");
    
  }
  
  return (
    <>
    {/* <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAObMzoszg93PuKpMW5JpUjbN4H9JC0isY&callback=initMap"></Script> */}
      <Component {...pageProps} />
    </>
  );
}
