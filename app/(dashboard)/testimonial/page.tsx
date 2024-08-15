import TestimonialList from "@/components/testimonial/list";

interface IPageProps {
  params: {
    lang: any;
  };
}

const Page: React.FunctionComponent<IPageProps> = async () => {
  return <TestimonialList />;
};

export default Page;
