// const API_KEY = process.env.API_KEY;

import Results from "@/components/Results";

// export default async function Home({searchParams}) {
//   const genre = searchParams.genre || 'fetchTrending';
//   const res = await fetch(
//     `https://api.themoviedb.org/3${
//       genre === 'fetchTopRated' ? `/movie/top_rated` : `trending/all/week`  
//     }?api_key=${API_KEY}&language=en-US&page=1`
//   );
//   const data = await res.json();
//   if(!res.ok){
//     throw new Error('Failed to fetch')
//   }
//   const results = data.results;
//   console.log(results);
//   return (
//     <div>Home</div>
//   )
// }

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }) {
  const genre = searchParams.genre || 'fetchTrending';

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3${
        genre === 'fetchTopRated' ? '/movie/top_rated' : '/trending/all/week'
      }?api_key=${API_KEY}&language=en-US&page=1`,
      {next:{revalidate:10000}}
    );

    if (!res.ok) {
      const errorMessage = `Failed to fetch: ${res.status} ${res.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorMessage = `Expected JSON response, but got: ${contentType}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await res.json();

    if (!data.results) {
      throw new Error('No results found in the response');
    }

    const results = data.results;
    // console.log(results);

    return (
      <div>
        <Results results={results} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div>
        Error loading data: {error.message}
      </div>
    );
  }
}

