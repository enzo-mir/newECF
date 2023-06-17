import { QueryClient, QueryClientProvider, useQueries } from "react-query";
import { cardQuery } from "../data/fetchCardData";
import Loading from "../pages/Loading";
import UndifinedRoute from "../pages/UndifinedPage";
import Admin from "../pages/Admin";
import { query } from "../data/fetchAllData";
const client = new QueryClient();

const QueryAdmin = () => {
  const DataProvider = () => {
    const [cardData, generalData] = useQueries([
      { queryKey: ["card"], queryFn: cardQuery },
      { queryKey: ["images"], queryFn: query },
    ]);

    return cardData.isLoading || generalData.isLoading ? (
      <Loading />
    ) : cardData.isError || generalData.isError ? (
      <UndifinedRoute />
    ) : cardData.data && generalData.data ? (
      <Admin card={cardData.data} imagesApi={generalData.data.image} hours={generalData.data.heures}/>
    ) : null;
  };

  return (
    <QueryClientProvider client={client}>
      <DataProvider />
    </QueryClientProvider>
  );
};

export default QueryAdmin;
