import Image from "next/image";

const LayoutFooter = () => {
  return (
    <footer className="text-center py-4">
      <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center pb-2">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/tutorial"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Tutorial
        </a>
        <a
          className="group flex items-center gap-2"
          href="/questions"
          rel="noopener noreferrer"
        >
          ?
          <span className="group-hover:underline hover:underline-offset-4">
            Frequently Asked Questions
          </span>
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://rarebeef.co.kr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Developer Homepage
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          target="_blank"
          href="https://chromewebstore.google.com/detail/ioapdbeebenampepgjabpjinndcoagcf"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Write a review
        </a>
      </div>
      <div className="text-sm">© 2024. RAREBEEF All Rights Reserved.</div>
    </footer>
  );
};

export default LayoutFooter;
