import Modal from "./common/Modal";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose} title="Get Help Now">
      <div className="space-y-6">
        <p className="text-gray-600">
          Choose how you'd like to contact us. Our experts are available 24/7 to assist you.
        </p>
        
        <div className="flex flex-col gap-4">
          {/* Phone Option */}
          <a
            href="tel:+13252195205"
            onClick={onClose}
            className="group flex items-center gap-4 rounded-lg border-2 border-gray-200 bg-white p-4 transition-all hover:border-red hover:bg-red/5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-navy group-hover:text-red">Call Us</h4>
              <p className="text-lg font-semibold text-gray-700">+1-325-219-5205</p>
              <p className="text-sm text-gray-500">Available 24/7</p>
            </div>
            <svg className="h-5 w-5 text-gray-400 group-hover:text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* Email Option */}
          <a
            href="mailto:Support@printalliance.net"
            onClick={onClose}
            className="group flex items-center gap-4 rounded-lg border-2 border-gray-200 bg-white p-4 transition-all hover:border-red hover:bg-red/5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-white">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-navy group-hover:text-red">Email Us</h4>
              <p className="text-lg font-semibold text-gray-700">Support@printalliance.net</p>
              <p className="text-sm text-gray-500">We'll respond within 1 hour</p>
            </div>
            <svg className="h-5 w-5 text-gray-400 group-hover:text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;

