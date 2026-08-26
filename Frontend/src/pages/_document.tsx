
// pages/_document.tsx
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { rtlLocales } from "@/i18n-locale-config";

export default class MyDocument extends Document<{ locale?: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const locale =
      (initialProps as any).__NEXT_DATA__?.locale ||
      (ctx.locale as string) ||
      (ctx.defaultLocale as string) ||
      "en";

    return {
      ...initialProps,
      locale,
    };
  }

  render() {
    const locale = (this.props as any).locale ?? "en";
    const direction = rtlLocales.includes(locale) ? "rtl" : "ltr";

    return (
      <Html lang={locale} dir={direction}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
