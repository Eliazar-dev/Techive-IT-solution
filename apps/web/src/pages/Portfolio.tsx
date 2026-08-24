import PortfolioSection from "../components/sections/PortfolioSection";
import PageHeader from "../components/PageHeader";
export default function Portfolio() {
  return (
    <>
      <PageHeader tag="Our Work Speaks" title="Proven Projects Executed at Scale" subtitle="A look at what we've shipped for real clients across healthcare, finance, and education." />
      <PortfolioSection />
    </>
  );
}
