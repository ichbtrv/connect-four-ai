import Layout from '@/components/Layout';

export default function Home() {
  return <>init</>;
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
