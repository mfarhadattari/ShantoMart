import Banner from "./Sections/Banner";
import NewProducts from "./Sections/NewProducts";
import PageTitle from './../../components/PageTitle';

const HomePage = () => {
  return (
    <main>
      <PageTitle title="ShantoMart"/>
      <Banner></Banner>
      <NewProducts></NewProducts>
    </main>
  );
};

export default HomePage;
