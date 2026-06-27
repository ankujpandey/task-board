import { Badge } from "@/components/ui/badge";
import { Status } from "@/types/task";

interface Props {
  status: Status;
}

export default function StatusBadge({ status }: Props) {
  switch (status) {
    case Status.TODO:
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
        >
          Todo
        </Badge>
      );

    case Status.IN_PROGRESS:
      return (
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-700 hover:bg-blue-100"
        >
          In Progress
        </Badge>
      );

    case Status.DONE:
      return (
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-700 hover:bg-green-100"
        >
          Done
        </Badge>
      );

    default:
      return <Badge>{status}</Badge>;
  }
}