import BannerSection from "@/components/home/Banner";
import BrandSection from "@/components/home/Brand";
import MostPopularSection from "@/components/home/MostPopular";
import NewArrivalSection from "@/components/home/NewArrival";
import TopRatedSection from "@/components/home/TopRated";
import TestimonialSection from "@/components/home/Testimonial";
import SubCategories from "@/components/home/SubCategories";
import "@/styles/home.css";

const Home = () => {
  return (
    <div className="pt-12">
      {/* Banner Section */}
      <BannerSection />

      {/* Brand Section */}
      <BrandSection />

      {/* Most Popular Section */}
      <MostPopularSection />

      {/* New Arrival Section */}
      <NewArrivalSection />

      {/* Top Rated Section */}
      <TopRatedSection />

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* SubCategories Section */}
      <SubCategories />
    </div>
  );
};

export default Home;
