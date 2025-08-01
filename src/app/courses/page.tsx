'use client';
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import courseData from "@/data/music_courses.json";

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-black py-12 pt-36">
      <h1 className="text-4xl sm:text-7xl text-center font-sans font-bold text-white mb-10">
        All Courses ({courseData.courses.length})
      </h1>

      <div className="flex flex-wrap justify-center gap-4">
        {courseData.courses.map((course) => (
          <CardContainer className="inter-var" key={course.id}>
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
              
              <CardItem
                translateZ={50}
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {course.title}
              </CardItem>

              <CardItem
                as="p"
                translateZ={60}
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                {course.description}
              </CardItem>

              <CardItem translateZ={100} className="w-full mt-4">
                <Image
                  src={course.image || "/images/default.jpg"} // fallback image
                  alt={course.title}
                  width={500}
                  height={240}
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
