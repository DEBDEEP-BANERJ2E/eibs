import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BriefcaseIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BriefcaseIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">JobHub</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/applications"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
                >
                  <UserIcon className="h-5 w-5" />
                  <span>My Applications</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
                >
                  <LogOutIcon className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}