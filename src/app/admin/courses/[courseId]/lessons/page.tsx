import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCourseLessons } from "./lessons.query";

export default async function LessonsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const lessons = (await getCourseLessons(courseId)) ?? [];

  return (
    <Table className="max-w-3xl mx-auto mt-5">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Rank</TableHead>
          <TableHead>Content</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead className="text-right">State</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lessons.map((lesson) => (
          <TableRow key={lesson.id}>
            <TableCell className="font-medium">{lesson.name}</TableCell>
            <TableCell>{lesson.rank}</TableCell>
            <TableCell className="truncate max-w-10">
              {lesson.content}
            </TableCell>
            <TableCell>{lesson.createdAt.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">{lesson.state}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
