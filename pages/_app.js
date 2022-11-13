import PropTypes from 'prop-types';

import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';
import '../components/styles/nprogress.css';

import Head from 'next/head';
import Page from '../components/Page';
import withData from '../lib/withData';
import { CartStateProvider } from '../lib/cartState';
import { MenuContextProvider } from '../lib/menuState';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <>
      <ApolloProvider client={apollo}>
        <MenuContextProvider>
          <CartStateProvider>
            <Page>
              <Head>
                <title>Sick Fits</title>
              </Head>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Component {...pageProps} />
            </Page>
          </CartStateProvider>
        </MenuContextProvider>
      </ApolloProvider>
    </>
  );
}

// MyApp.getInitialProps = async function ({ Component, ctx }) {
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }
//   pageProps.query = ctx.query;
//   return { pageProps };
// };

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
  apollo: PropTypes.any,
};

export default withData(MyApp);
