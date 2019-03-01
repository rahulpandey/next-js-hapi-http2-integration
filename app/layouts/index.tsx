import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
interface IProps {
  children: React.ReactNode;
  title?: string;
}
const Wrapper = styled.footer`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  main {
    flex: 1;
  }
`;
const Layout: React.SFC<IProps> = ({ children, title = 'Blog' }) => (
  <Wrapper>
    <Head>
      <title>{title}</title>
    </Head>
    <header />
    <nav>
      <Link href="/">
        <button>Home</button>
      </Link>
      <Link href="/about">
        <button>About</button>
      </Link>
    </nav>
    <main>{children}</main>
  </Wrapper>
);
export { Layout };
