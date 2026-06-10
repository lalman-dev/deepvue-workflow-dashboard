import { useWorkflows } from "@/hooks/useWorkflows";

const WorkflowsPage = () => {
  const { data, isLoading, error } = useWorkflows();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>{data.length} workflows loaded</div>;
};

export default WorkflowsPage;
