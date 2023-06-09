import Head from "next/head";
import { Header, Modal, Row, SubscriptionPlan } from "src/components";
import { GetServerSideProps } from "next";
import { API_REQUEST } from "src/services/api.services";
import { IMovie, Product } from "src/interfaces/app.interface";
import Hero from "src/components/hero/Hero";
import { useInfoStore } from "src/store/store";
import { useContext, useEffect } from "react";
import { getList } from "src/components/helpers/lists";
import { AuthContext } from "src/context/auth.context";

export default function Home({
  trending,
  topRated,
  tv_topRated,
  popular,
  documentary,
  family,
  comedy,
  history,
  products,
  subscription,
  list
}: HomeProps): JSX.Element {

  const {modal} = useInfoStore();
  const {user} = useContext(AuthContext)

  if(!subscription.length) return <SubscriptionPlan products={products}/>

  return (
    <>
      <div className={`relative min-h-screen bg-gradient-to-b from-gray-900/70 to-[#010511]  ${modal && '!h-screen overflow-hidden'}`}>
        <Head>
          <title>Home - Xoja </title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo.svg" />
        </Head>
        <Header />
        <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
          <Hero trending={trending} />
          <section>
            <Row title="Top Rated" movies={topRated} />
            <Row title="TV Shows" movies={tv_topRated} isBig={true} />
            <Row title="Popular" movies={popular.reverse()} />
            <Row title="Documentary" movies={documentary} isBig={true} />
            <Row title="Family" movies={family.reverse()} />
            <Row title="Comedy" movies={comedy} isBig={true} />
            {list.length ?  <Row title="My List" movies={list} /> : null}
            <Row title="History" movies={history.reverse()} />
          </section>
        </main>

        {modal && <Modal />}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({req}) => {

  const user_id = req.cookies.user_id

  if(!user_id){
    return {
      redirect: {destination: '/auth', permanent: false}
    }
  }

  const  [trending, topRated, tv_topRated, popular, documentary, family, comedy,history, products, subscription] = await Promise.all([
    
    fetch(API_REQUEST.trending).then((res) => res.json()),
    fetch(API_REQUEST.topRated).then((res) => res.json()),
    fetch(API_REQUEST.tv_topRated).then((res) => res.json()),
    fetch(API_REQUEST.popular).then((res) => res.json()),
    fetch(API_REQUEST.documentary).then((res) => res.json()),
    fetch(API_REQUEST.family).then((res) => res.json()),
    fetch(API_REQUEST.comedy).then((res) => res.json()),
    fetch(API_REQUEST.history).then((res) => res.json()),
    fetch(API_REQUEST.products_list).then((res) => res.json()),
    fetch(`${API_REQUEST.subscription}/${user_id}`).then((res) => res.json())
  ]); 

  const myList = await getList(user_id)

  return {
    props: {
      trending: trending.results,
      topRated: topRated.results,
      tv_topRated: tv_topRated.results,
      popular: popular.results,
      documentary: documentary.results,
      family: family.results,
      comedy: comedy.results,
      history: history.results,
      products:products.products.data,
      subscription:subscription.subscription.data,
      list: myList.map(c => c.product)
    },
  };
};

interface HomeProps {
  trending: IMovie[];
  topRated: IMovie[];
  tv_topRated: IMovie[];
  popular: IMovie[];
  documentary: IMovie[];
  history: IMovie[];
  comedy: IMovie[];
  family: IMovie[];
  products:Product[];
  subscription:string[];
  list: IMovie[]
}
