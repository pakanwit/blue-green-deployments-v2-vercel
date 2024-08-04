import { useRouter } from 'next/router';

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (window.confirm(message)) {
      router.push(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default ConfirmLink;
