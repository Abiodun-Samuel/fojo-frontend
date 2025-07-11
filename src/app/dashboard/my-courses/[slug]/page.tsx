'use client';
import CourseDetails from '@/components/dashboard/course/CourseDetails';
import Header from '@/layout/dashboard/Header';
import { useParams } from 'next/navigation';

export default function CoursePage() {
  const params = useParams();
  const courseTitle = params?.slug;

  return (
    <div className="flex flex-col gap-6">
      <Header Heading={'My Courses'} />
      <CourseDetails courseTitle={courseTitle as string} />
    </div>
  );
}
