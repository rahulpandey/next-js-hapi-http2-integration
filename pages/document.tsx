import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <body style={{ color: "red" }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
