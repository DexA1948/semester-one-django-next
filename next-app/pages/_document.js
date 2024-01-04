import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* Global Site Tag (gtag.js) - Google Analytics */}
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                                page_path: window.location.pathname,
                                });
                            `,
					}}
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>

				<link
					rel="stylesheet"
					href="/includes/bootstrap.css"
					crossOrigin="anonymous"
				/>
			</Head>
			<body>
				<Main />
				<NextScript>
					<script src="/includes/popper.js" crossOrigin="anonymous" />
					<script src="/includes/jquery.js" crossOrigin="anonymous" />
					<script src="/includes/bootstrap.js" crossOrigin="anonymous" />
				</NextScript>
			</body>
		</Html>
	);
}
