type PreItLogoProps = {
  className?: string;
  title?: string;
};

export function PreItLogo({ className, title = 'PRE-IT' }: PreItLogoProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M9 5L5 12l4 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 5l4 7-4 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 5l-3 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
