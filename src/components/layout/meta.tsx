import Head from "next/head";

export default function Meta({
	title = "Rollin",
	description = "Colaborate and build faster, together.",
}: {
	title?: string;
	description?: string;
}) {
	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="icon" href="/favicon.ico" />
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>
	);
}
