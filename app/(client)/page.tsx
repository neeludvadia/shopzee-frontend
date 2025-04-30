import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";

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
