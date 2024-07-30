import { useRouter } from "next/router";

interface ConfirmLinkProps {
  href: string;
  children: React.ReactNode;
  message: string;
  className?: string;
}

const ConfirmLink: React.FC<ConfirmLinkProps> = ({
  href,
  children,
  message,
  className,
}) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (window.confirm(message)) {
      router.push(href);
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export default ConfirmLink;
