import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import { fetchAllCategories } from "./utility";

export default async function Home () {
  return (
    <>
    <Container className="py-10">
    <HomeBanner/>
    <ProductGrid/>
    </Container>
    </>
  );
}
