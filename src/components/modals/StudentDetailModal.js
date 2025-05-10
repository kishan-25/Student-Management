
const StudentDetailModal = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Student Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-700">
                  {student.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-bold mt-2">{student.name}</h3>
              <p className="text-gray-600">{student.email}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex border-b pb-2">
              <span className="font-bold w-1/3">Student ID:</span>
              <span className="w-2/3">{student.id}</span>
            </div>
            
            <div className="flex border-b pb-2">
              <span className="font-bold w-1/3">Course:</span>
              <span className="w-2/3">{student.course}</span>
            </div>
            
            {student.phone && (
              <div className="flex border-b pb-2">
                <span className="font-bold w-1/3">Phone:</span>
                <span className="w-2/3">{student.phone}</span>
              </div>
            )}
            
            {student.address && (
              <div className="flex border-b pb-2">
                <span className="font-bold w-1/3">Address:</span>
                <span className="w-2/3">{student.address}</span>
              </div>
            )}
            
            {student.enrollmentDate && (
              <div className="flex border-b pb-2">
                <span className="font-bold w-1/3">Enrolled:</span>
                <span className="w-2/3">{new Date(student.enrollmentDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;