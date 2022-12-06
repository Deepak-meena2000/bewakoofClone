import clsx from 'clsx';
import {Fragment} from 'react';

import {Heading} from '~/components';

export function PageHeader({
  children,
  className,
  heading,
  variant = 'default',
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  heading?: string;
  variant?: 'default' | 'blogPost' | 'allCollections' | 'subHeading';
  [key: string]: any;
}) {
  const variants: Record<string, string> = {
    default:
      'grid w-full gap-8 p-6 py-8 md:p-8 lg:p-12 justify-items-start mt-10',
    blogPost:
      'grid md:text-center w-full gap-4 p-6 py-8 md:p-8 lg:p-12 md:justify-items-center mt-10',
    allCollections: ' items-baseline gap-8 p-0 text-xs font-bold p-10 ml-60',
    subHeading: 'items-baseline gap-8 p-0 text-xs font-bold p-10 ml-60',
  };

  const styles = clsx(variants[variant], className);

  return (
    <div className={styles}>
      <header {...props}>
        {heading && (
          <span className="text-3xl font-bold font-monstreat">{heading}</span>
        )}
        {children}
        <span className="text-3xl text-slate-400 font-monstreat pl-4">
          (1788)
        </span>
      </header>

      <div className="w-28 h-0.5 bg-primaryButton"></div>
    </div>
  );
}
