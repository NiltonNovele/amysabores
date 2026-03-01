"use client";

import ClientHomepage from "@/components/ClientHomepage";

interface HomepageProps {
  category?: string;
}

const Homepage = ({ category }: HomepageProps) => {
  return <ClientHomepage category={category} />;
};

export default Homepage;