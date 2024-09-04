import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  return (
    <div>
      <h1>Student Details: {studentId}</h1>
    </div>
  );
};

export default StudentDetails;