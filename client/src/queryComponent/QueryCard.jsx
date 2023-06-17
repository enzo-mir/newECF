import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { cardQuery } from "../data/fetchCardData";
import Loading from "../pages/Loading";
import UndifinedRoute from "../pages/UndifinedPage";
import Card from "../pages/Card";
const client = new QueryClient();

const QueryCard = () => {
  const DataProvider = () => {
    const { data, error, isLoading } = useQuery({
      queryKey: ["card"],
      queryFn: cardQuery,
    });

    return isLoading ? (
      <Loading />
    ) : error ? (
      <UndifinedRoute />
    ) : data ? (
      <Card
        entree={data.entree}
        plat={data.plat}
        dessert={data.dessert}
        menu={data.menu}
      />
    ) : null;
  };

  return (
    <QueryClientProvider client={client}>
      <DataProvider />
    </QueryClientProvider>
  );
};

export default QueryCard;
