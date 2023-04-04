import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

//The below code defines an async function called getServerSideProps that takes a Next.js page context object as its argument. Inside the function, the getSession function is called with the context object, and its result is assigned to session using the await keyword.

// If session is falsy (i.e., null, undefined or false), then a redirect object is returned containing destination and permanent properties with values of "/auth" and false respectively. This means that if the user does not have a session, then they will be redirected to "/auth".

// If session is truthy, then an object is returned containing a props property with an empty object as its value. This means that if the user has a valid session, then the page will be rendered with an empty props object.

// This function is typically used in Next.js to retrieve data for a page during server-side rendering, and can be useful for authentication and authorization purposes.

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
