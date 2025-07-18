
import Link from "next/link";
const HeroBanner = () => {
  return (
    <section className="relative flex items-center justify-center  bg-cover bg-center">
      <div className="relative z-10 text-center px-6 text-white max-w-[1512px] mx-auto">
        <h1 className="text-4xl font-cormorant md:text-6xl font-medium leading-[1.2]">
          DISCIPLESHIP RESOURCES FOR FOLLOWERS OF JESUS ONLY.
        </h1>

        <p className="mt-4 text-[16px] md:text-[18px] font-lora text-gray-200">
          Access deep, Bible-based teaching designed to help you follow Jesus daily.
        </p>

        <div className="mt-6 flex flex-row  gap-2 justify-center">
          <Link href="/signup" className="bg-white text-black  px-4 py-2 md:px-8 md:py-3 rounded-lg sm:text-[16px] font-medium hover:bg-gray-300 transition">
            Start Learning
          </Link>
          <Link href='/dashboard/explore-courses' className="border border-white px-4 py-2 md:px-8 md:py-3 rounded-lg text-[16px] font-medium hover:bg-white hover:text-black transition">
            Browse Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
