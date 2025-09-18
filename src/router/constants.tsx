import { lazy, Suspense } from "react";
import { Center, Skeleton } from "@mantine/core";
import Layout from "@/components/Layout";
import { Route } from "@/router/types";


// Creando una costante con i nomi delle rotte, riusciamo a snellire la procedura che ci permette
// di assegnare la giusta etichetta ai tasti di navigazione e, allo stesso tempo, ci permette di
// ricavare un tipo per i nomi delle rotte, così da evitare errori nel momento in cui dobbiamo
// assegnare un nome alla rotta, infatti il tipo ricavato viene usato all'interno del tipo "Route"
export const ROUTES_NAME = [
  "home",
  "crops_costs",
  "efficiency_quality",
  "field_maps",
  "resources_production",
  "weather_yield",
] as const;

// Creando questo componente, abbiamo la possibilità di caricare le pagine in modo dinamico, infatti
// infatti anche in caso di attesa delle informazioni necessarie, il componente non viene caricato
// e viene mostrato uno skeleton
const Loadable = (Component: React.ComponentType) => (props: any) => (
  <Suspense
    fallback={
      <Center style={{ height: "100vh", width: "100%" }}>
        <Skeleton height="100%" width="100%" />
      </Center>
    }
  >
    <Component {...props} />
  </Suspense>
);

// Utilizzando il lazy loading, ogni pagina viene caricata solo quando viene visitata
const HomePage = Loadable(lazy(() => import("@/pages/Home")));
const CropsCostsPage = Loadable(lazy(() => import("@/pages/CropsCosts")));
const EfficiencyQualityPage = Loadable(lazy(() => import("@/pages/EfficiencyQuality")));
const FieldMapsPage = Loadable(lazy(() => import("@/pages/FieldMaps")));
const ResourcesProductionPage = Loadable(lazy(() => import("@/pages/ResourcesProduction")));
const WeatherYieldPage = Loadable(lazy(() => import("@/pages/WeatherYield")));

// Creando una costante per le routes, abbiamo la possibilità di riutilizzare la stessa costante
// in più di una funzione, come ad esempio la generazione dinamica dei tasti di navigazione
export const navbarRoutes: Route[] = [
  {
    path: "/",
    element: <HomePage />,
    name: "home",
  },
  {
    path: "/crops_costs",
    element: <CropsCostsPage />,
    name: "crops_costs",
  },
  {
    path: "/efficiency_quality",
    element: <EfficiencyQualityPage />,
    name: "efficiency_quality",
  },
  {
    path: "/field_maps",
    element: <FieldMapsPage />,
    name: "field_maps",
  },
  {
    path: "/resources_production",
    element: <ResourcesProductionPage />,
    name: "resources_production",
  },
  {
    path: "/weather_yield",
    element: <WeatherYieldPage />,
    name: "weather_yield",
  },
];

export const routes: Route[] = [
  {
    path: "/",
    element: <Layout />,
    children: [...navbarRoutes],
  },
];
