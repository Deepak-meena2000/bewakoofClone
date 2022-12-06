import {Link, useUrl, useCart, Image} from '@shopify/hydrogen';
import {useWindowScroll} from 'react-use';
import bewkoofImage from '../../assets/bewakoof.svg';
import {
  Heading,
  IconAccount,
  IconBag,
  IconMenu,
  IconSearch,
  Input,
} from '~/components';

import {CartDrawer} from './CartDrawer.client';
import {MenuDrawer} from './MenuDrawer.client';
import {useDrawer} from './Drawer.client';

import type {EnhancedMenu} from '~/lib/utils';
import {Collection} from '@shopify/hydrogen/storefront-api-types';

/**
 * A client component that specifies the content of the header on the website
 */
export function Header({
  title,
  menu,
  collections,
}: {
  title: string;
  menu?: EnhancedMenu;
  collection?: Collection;
}) {
  const {pathname} = useUrl();
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu!} />
      <DesktopHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
        collections={collections}
      />
      <MobileHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function MobileHeader({
  countryCode,
  title,
  isHome,
  openCart,
  openMenu,
}: {
  countryCode?: string | null;
  title: string;
  isHome: boolean;
  openCart: () => void;
  openMenu: () => void;
}) {
  const {y} = useWindowScroll();

  const styles = {
    button: 'relative flex items-center justify-center w-8 h-8',
    container: `${
      isHome
        ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
        : 'bg-contrast/80 text-primary'
    } ${
      y > 50 && !isHome ? 'shadow-lightHeader ' : ''
    }flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8`,
  };

  return (
    <header role="banner" className={styles.container}>
      <div className="flex items-center justify-start w-full gap-4">
        <button onClick={openMenu} className={styles.button}>
          <IconMenu />
        </button>
        <form
          action={`/${countryCode ? countryCode + '/' : ''}search`}
          className="items-center gap-2 sm:flex"
        >
          <button type="submit" className={styles.button}>
            <IconSearch />
          </button>
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </form>
      </div>

      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
        to="/"
      >
        <Heading className="font-bold text-center" as={isHome ? 'h1' : 'h2'}>
          {title}
        </Heading>
      </Link>

      <div className="flex items-center justify-end w-full gap-4">
        <Link to={'/account'} className={styles.button}>
          <IconAccount />
        </Link>
        <button onClick={openCart} className={styles.button}>
          <IconBag />
          <CartBadge dark={isHome} />
        </button>
      </div>
    </header>
  );
}

function DesktopHeader({
  countryCode,
  isHome,
  menu,
  openCart,
  title,
  collections,
}: {
  countryCode?: string | null;
  isHome: boolean;
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
  collections?: Collection;
}) {
  const {y} = useWindowScroll();
  const styles = {
    button:
      'relative flex items-center justify-center w-8 h-8 focus:ring-primary/5 pl-4',
    linkStyles: 'm-2 text-black/75 text-xs',
    container: `${
      isHome
        ? 'bg-contrast  text-contrast dark:text-primary shadow-darkHeader'
        : 'bg-contrast  text-primary dark:text-primary  shadow-darkHeader'
    } ${
      y > 50 && !isHome ? 'shadow-lightHeader ' : 'shadow-lightHeader'
    }hidden h-14 lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 pl-40 pr-28 pt-12 `,
  };

  // const MyCollectionCard = ({collection}: {collection: Collection}) => {
  //   return (
  //     <Link
  //       to={`/collections/${collection.handle}`}
  //       className="hover:border-b-4 border-primaryButton"
  //     >
  //       <span>{collection.title}</span>
  //     </Link>
  //   );
  // };

  return (
    <div>
      <header className="w-full  z-50 top-0 h-20 mb-8  sticky  ">
        <div className="w-screen flex text-center bg-ternary ">
          <div className="">
            <div className="float-left w-fit ml-72">
              <Link
                to="https://www.bewakoof.com/campaign/delights-coupons-discounts-offers-sale"
                className={styles.linkStyles}
              >
                Offers
              </Link>
              <Link
                to="https://www.bewakoof.com/fanbook-testimonial-reviews"
                className={styles.linkStyles}
              >
                Fanbook
              </Link>
              <Link
                to="https://www.bewakoof.com/campaign/apps"
                className={styles.linkStyles}
              >
                Download App
              </Link>

              <Link
                to="https://www.bewakoof.com/tribe"
                className={styles.linkStyles}
              >
                TriBe Membership
              </Link>
            </div>
          </div>
          <div className="float-right w-fit ml-auto mr-64 ">
            <Link
              to="https://www.bewakoof.com/contact-us/order-delivery-payment"
              className={styles.linkStyles}
            >
              Contact Us
            </Link>
            <Link
              to="https://www.bewakoof.com/login?ref=/myaccount/orders"
              className={styles.linkStyles}
            >
              Track Order
            </Link>
          </div>
        </div>
        <header className={styles.container}>
          <div className="flex gap-12 ml-32">
            <Link className={`font-bold`} to="/">
              <Image
                src={bewkoofImage}
                alt="bewakoof"
                width="147px"
                height="30px"
                className="pb-12"
              />
            </Link>
            <div className="w-96 h-14  ">
              <nav className="flex  ">
                {/* Top level menu items */}
                {(menu?.items || []).map((item) => (
                  <Link
                    key={item.id}
                    to={item.to}
                    target={item.target}
                    className="hover:border-b-4 border-primaryButton font-monstreat text-sm font-medium uppercase text-black/90 decoration-black decoration-solid px-2.5 py-0 tracking-widest"
                  >
                    {item.title}
                  </Link>
                ))}

                {/* {collections?.map((collection, i) => (
              <MyCollectionCard
                collection={collection}
              />
            ))}
           */}
              </nav>
            </div>
          </div>
          <div className="flex items-center gap-1 pb-12 mr-40 ">
            <div className="w-72 h-12 pt-2 ">
              <form
                action={`/${countryCode ? countryCode + '/' : ''}search`}
                className="flex items-center gap-2  border rounded bg-ternary "
              >
                <button type="submit" className={styles.button}>
                  <IconSearch />
                </button>
                <Input
                  className="w-64 font-monstreat text-xs"
                  type="search"
                  variant="minisearch"
                  placeholder="Search by product, category or collection"
                  name="q"
                />
              </form>
            </div>
            <div className="pl-4">
              <span color="text-black/50">|</span>
            </div>
            <div className="flex text-center pl-2">
              <Link to="https://www.bewakoof.com/login">Login</Link>
            </div>
            <Link to={'/account'} className={styles.button}>
              <IconAccount />
            </Link>

            <Image
              src="https://images.bewakoof.com/web/india-flag-round-1639566913.png"
              width="20px"
              height="28px"
              className="ml-4"
            />

            <button onClick={openCart} className={styles.button}>
              <IconBag />
              <CartBadge dark={isHome} />
            </button>
          </div>
        </header>
      </header>
    </div>
  );
}

function CartBadge({dark}: {dark: boolean}) {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={`${
        dark
          ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
          : 'text-contrast bg-primary'
      } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
}
