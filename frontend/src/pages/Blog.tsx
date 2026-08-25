import BlogSection from "../components/sections/BlogSection";
import PageHeader from "../components/PageHeader";
export default function Blog() {
  return (
    <>
      <PageHeader tag="From Our Blog" title="Insightful Engineering for Operators" subtitle="Notes from our team on what we're building and what we're learning." />
      <BlogSection />
    </>
  );
}
