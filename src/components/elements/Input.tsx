import clsx from 'clsx';

export function Input({
  className = '',
  type,
  variant,
  ...props
}: {
  className?: string;
  type?: string;
  variant: 'search' | 'minisearch';
  [key: string]: any;
}) {
  const variants = {
    search:
      'bg-transparent px-0 py-2 text-heading w-full focus:ring-0 border-x-0 border-t-0 transition border-b-2 border-primary/10 focus:border-primary/90  ',
    minisearch:
      'bg-transparent  md:inline-block transition border-transparent -mb-px border-x-0 border-y-0 appearance-none px-0 py-1 focus:ring-transparent text-sm placeholder:text-black/50  ',
  };

  const styles = clsx(variants[variant], className);

  return <input type={type} {...props} className={styles} />;
}
