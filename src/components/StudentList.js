
const StudentList = ({ students, onViewDetails }) => {
  if (students.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No students found matching the current filter.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left border-b">ID</th>
            <th className="py-3 px-4 text-left border-b">Name</th>
            <th className="py-3 px-4 text-left border-b">Email</th>
            <th className="py-3 px-4 text-left border-b">Course</th>
            <th className="py-3 px-4 text-center border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">{student.id}</td>
              <td className="py-3 px-4 border-b">{student.name}</td>
              <td className="py-3 px-4 border-b">{student.email}</td>
              <td className="py-3 px-4 border-b">{student.course}</td>
              <td className="py-3 px-4 border-b text-center">
                <button
                  onClick={() => onViewDetails(student)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;