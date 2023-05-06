import { QueryClient, QueryClientProvider, useQueries } from "react-query";
import { cardQuery } from "../data/fetchCardData";
import { query } from "../data/fetchAllData";
import UndifinedRoute from "../pages/UndifinedPage";
import Loading from "../pages/Loading";
import Navigation from "../pages/naviguation/Navigation";
const client = new QueryClient();

const QueryRender = () => {
  const DataProvider = () => {
    const [allCardQuery, allDataQuery] = useQueries([
      { queryKey: ["card"], queryFn: cardQuery },
      { queryKey: ["usesData"], queryFn: query },
    ]);

    return allCardQuery.isLoading || allDataQuery.isLoading ? (
      <Loading />
    ) : allCardQuery.error || allDataQuery.error ? (
      <UndifinedRoute />
    ) : allCardQuery.data && allDataQuery.data ? (
      <Navigation cardQuery={allCardQuery} allDataQuery={allDataQuery} />
    ) : null;
  };

  return (
    <QueryClientProvider client={client}>
      <DataProvider />
    </QueryClientProvider>
  );
};

export default QueryRender;
