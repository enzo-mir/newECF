import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Loading from "../pages/Loading";
import UndifinedRoute from "../pages/UndifinedPage";
import { query } from "../data/fetchAllData";
import Home from "../pages/Home";
import { hourStore } from "../data/stores/admin.store";
const client = new QueryClient();

const QueryHome = () => {
  const DataProvider = () => {
    const { data, error, isLoading } = useQuery({
      queryKey: ["usesData"],
      queryFn: query,
    });

    const setHours = hourStore((state) => state.setHours);

    return isLoading ? (
      <Loading />
    ) : error ? (
      <UndifinedRoute />
    ) : data ? (
      (setHours(data.heures),
      (<Home heures={data.heures} imagesApi={data.image} />))
    ) : (
      <UndifinedRoute />
    );
  };

  return (
    <QueryClientProvider client={client}>
      <DataProvider />
    </QueryClientProvider>
  );
};

export default QueryHome;
