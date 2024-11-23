import FilterSection from "@/components/filter/FilterSection";
interface FilterPageProps {
  params: {
    title: string;
  };
}

const FilterPage = ({ params: { title } }: FilterPageProps) => {
  return <FilterSection title={title} />;
};

export default FilterPage;
