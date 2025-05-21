import { prisma } from "@/lib/prisma";

export async function getCourseLessons(courseId: string) {
  try {
    return await prisma.lesson.findMany({
      where: {
        courseId: courseId,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
