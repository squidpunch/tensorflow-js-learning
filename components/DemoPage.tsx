import Head from 'next/head';

type DemoPageProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

const DemoPage = ({ title, description, children }: DemoPageProps) => (
  <div className="flex h-screen items-center justify-center flex-col min-h-screen py-2 px-0">
    <Head>
      <title>Learning TensorFlow.js | {title}</title>
    </Head>
    <main className="flex flex-col justify-center items-center py-20 px-0 flex-1 w-3/5">
      <h1 className="m-0 leading-tight text-7xl font-bold">{title}</h1>
      <p className="mb-5">{description}</p>
      {children}
    </main>
    <footer className="w-full h-20 border-t-2 flex justify-center items-center">
      <a href="/">&larr; Back Home</a>
    </footer>
  </div>
);

export default DemoPage;
