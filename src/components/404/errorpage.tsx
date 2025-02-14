import React from "react";

function Error404() {
    return (
        <main className="grid min-h-screen place-items-center bg-white px-6 py-12 sm:py-16 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-[#ff204e]">404</p> {/* Color rojo */}
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    Page not found
                </h1>
                <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a 
                        href="/" 
                        className="rounded-md bg-[#ff204e] px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-[#84001a] focus:outline-none focus:ring-2 focus:ring-[#ff204e] focus:ring-offset-2"
                    >
                        Go back home
                    </a>
                    <a 
                        href="/contact" 
                        className="text-lg font-semibold text-[#ff204e] hover:text-[#84001a]"
                    >
                        Contact support <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
        </main>
    );
}

export default Error404;
