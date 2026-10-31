"use client";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f8f8f3] px-6 text-[#292d26]">
      <div className="surface max-w-md p-6">
        <p className="metric text-sm">SYSTEM INTERRUPT</p>
        <h1 className="mt-3 text-2xl font-semibold">Fit.VR needs a reset.</h1>
        <p className="mt-3 text-sm text-[#748068]">{error.message}</p>
        <button
          className="mt-5 rounded-[10px] bg-[#d9e6c7] px-4 py-2 text-sm font-semibold text-black"
          onClick={reset}
        >
          Retry
        </button>
      </div>
    </main>
  );
}
