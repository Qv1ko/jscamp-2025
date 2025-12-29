import { useParams } from "react-router";

export function JobDetail() {
  const { jobId } = useParams();
  return (
    <>
      <h1>Job detail</h1>
      <h2>La id es {jobId}</h2>
    </>
  );
}
