import Image from 'next/image';

const loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Image
        src="/miro-logo.svg"
        alt="Logo"
        width={120}
        height={120}
        className="animate-pulse duration-700"
      />
    </div>
  );
};

export default loading;
