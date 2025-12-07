const PhoneFloatingButton = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
      <a
        href="tel:+13252195205"
        className="group relative flex items-center justify-center bg-navy hover:bg-blue-800 text-white rounded-l-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Call us"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="absolute right-full mr-2 px-3 py-2 bg-navy text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity shadow-lg">
          Call +1-325-219-5205
        </span>
      </a>
    </div>
  );
};

export default PhoneFloatingButton;



