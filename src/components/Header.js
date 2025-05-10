
const Header = ({ user, onLogin, onLogout }) => {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Student Manager</h1>
        </div>
        
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.name}</span>
              <button 
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;